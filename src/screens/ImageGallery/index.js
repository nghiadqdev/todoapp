import { ActivityIndicator, FlatList, Image, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import HeaderApp from '../../component/headerApp'
import CameraRoll from '@react-native-community/cameraroll';
import screenStyles from '../../config/screenStyles';
import { checkPermissionPhoto, deviceWidth } from '../../config';
import {request, PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions'
import ImageViewer from 'react-native-image-zoom-viewer';

const ImageGallery = () => {
  const listFooterImgRef = useRef(null)
  const [listImage, setListImage] = useState([])
  const [endLoadImage, setEndLoadImage] = useState({
    nextPage: true,
    endCursor: '',
    startCursor: '',
  })
  const [loadMoreImg, setLoadMoreImg] = useState(false)
  const [modalDetail, setModalDetail] = useState(false)
  const [indexSelect, setindexSelect] = useState(-1)
  const [isScale, setScale] = useState(false)

  useEffect(() => {
    checkPermisstion()
  }, []);

  //action
  const checkPermisstion = async () => {
    let resultCheckPhoto = await checkPermissionPhoto();
    switch (resultCheckPhoto) {
      case RESULTS.UNAVAILABLE:
        showToast('Can not get gallery!');
        break;
      case RESULTS.DENIED:
        return request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ).then(res => {
          if (res === RESULTS.GRANTED) {
            loadImage();
            return;
          } else {
            return false;
          }
        });
      case RESULTS.GRANTED:
        loadImage();
        break;
      case RESULTS.LIMITED:
        loadImage();
        break;
      case RESULTS.BLOCKED:
        _alertForGalleryPermission();
        break;
    }
  }
  const loadImage = async () => { 
    var allImage = [...listImage]
    if (endLoadImage.endCursor === '') {
        await CameraRoll.getPhotos({
        first: 29,
        assetType: 'Photos',
        })
        .then( img => {
            setEndLoadImage({
            nextPage: img.page_info.has_next_page,
            endCursor: img.page_info.end_cursor,
            startCursor: img.page_info.start_cursor,
            });
            img.edges.forEach(element => {
                allImage.push({url: element.node.image.uri});
            });
        })
        .catch(err => {
            _alertForGalleryPermission();
        });
        setListImage(allImage);
    } else if (endLoadImage.nextPage) {
        setLoadMoreImg(true);
        await CameraRoll.getPhotos({
        first: 15,
        assetType: 'Photos',
        after: endLoadImage.endCursor,
        })
        .then( img => {
            setEndLoadImage({
            nextPage: img.page_info.has_next_page,
            endCursor: img.page_info.end_cursor,
            startCursor: img.page_info.start_cursor,
            });
            img.edges.forEach(element => {
            allImage.push({url: element.node.image.uri});
            });
        })
        .catch(err => {
            _alertForGalleryPermission();
        });
        setListImage(allImage);
    }
    setLoadMoreImg(false);
  }
  const gotoDetail = (index) => {
    setModalDetail(true)
    setindexSelect(index)
    setTimeout(() => {
      if (listFooterImgRef.current) {
        listFooterImgRef.current.scrollTo({x: index * 60 - 90, y: 0, animated: true})
      }
    }, 300);
  }
  function _alertForGalleryPermission() {
    Alert.alert(
        'Access to photos?',
        [
        {
            text: 'No',
            onPress: () => console.log('Permission denied'),
            style: 'cancel',
        },
        {
            text: 'OK',
            onPress: () =>
            openSettings().catch(() => console.warn('cannot open settings')),
        },
        ],
    );
  }
  const closeModal = () => setModalDetail(false)
  const handleScaleImg = (position) => {
    setScale(position.scale > 1)
  }
  const handleChangeImg = (index) => {
    setindexSelect(index)
    listFooterImgRef.current.scrollTo({x: index * 60 - 90, y: 0, animated: true})
  }
  //render
  const _renderItemImage = (item, index) => {
      return(
          <TouchableOpacity onPress={() => gotoDetail(index)} style={styles.viewItemImage}>
              <Image style={styles.imageStyle} resizeMethod='resize' source={{uri: item?.url}}/>
          </TouchableOpacity>
      )
  }

  const headerModal = () => {
      if (!isScale)
      return(
        <View style={styles.containtStyle}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.txtBack}>{'<'}</Text>
            </TouchableOpacity>
            <View style={styles.viewTitle}>
              <Text style={styles.txtTitle}>{'Preview'}</Text>
            </View>
        </View>
      )
  }

  const footerModal = () => {
      if (!isScale)
      return(
      <View style={styles.viewFooter}>
        <ScrollView ref={listFooterImgRef} horizontal showsHorizontalScrollIndicator={false} style={{paddingLeft: 90}}>
            {listImage.map((item, index) => <Image key={index} source={{uri: item.url}} style={[styles.itemImgFooter, {opacity: index === indexSelect ? 1 : 0.3}]} />)}
        </ScrollView>
      </View>
    )
}

  const modalViewDetail = () => {
    return(
        <Modal
        visible={modalDetail}
        animationType={'fade'}
        transparent={true}
        supportedOrientations={[
          'portrait',
          'portrait-upside-down',
          'landscape',
          'landscape-left',
          'landscape-right',
        ]}>
            <ImageViewer
                backgroundColor={'white'}
                enableSwipeDown
                renderIndicator={() => null}
                saveToLocalByLongPress={false}
                useNativeDriver
                onLongPress={() => {}}
                onMove={handleScaleImg}
                onSwipeDown={closeModal}
                onChange={handleChangeImg}
                index={indexSelect}
                loadingRender={() => (
                  <ActivityIndicator size="large" />
                )}
                renderHeader={headerModal}
                renderFooter={footerModal}
                imageUrls={listImage}/>
        </Modal>
    )
  }
  return (
    <SafeAreaView style={screenStyles.flexCenter}>
      <HeaderApp title={'Image gallery'} />
      <View style={screenStyles.flex1}>
        <FlatList
            data={listImage}
            extraData={listImage}
            numColumns={3}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            onEndReached={loadImage}
            onEndReachedThreshold={0.5}
            renderItem={({item, index}) => _renderItemImage(item, index)}
            ListFooterComponent={() => loadMoreImg ? <ActivityIndicator /> : <></>}
        />
      </View>
      {modalViewDetail()}
    </SafeAreaView>
  )
}

export default ImageGallery

const styles = StyleSheet.create({
    viewItemImage: {
        width: deviceWidth / 3,
        height: deviceWidth / 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
    },
    containtStyle: {
        width: deviceWidth,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: 'white',
        display: 'flex',
    },
    txtBack: {
        color: '#262626',
        fontWeight: '500',
        fontSize: 18,
        width: 30,
    },
    txtTitle: {
        textAlign: 'center',
        color: '#EF4638',
        fontWeight: '800',
        fontSize: 14,
    },
    viewTitle: {
        flex: 1,
        paddingRight: 30,
    },
    viewFooter: {
        height: 90,
        width: deviceWidth,
    },
    itemImgFooter: {
        width: 60,
        height: 90,
    }
})