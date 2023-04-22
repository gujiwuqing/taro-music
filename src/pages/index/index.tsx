import {View, Text, Swiper, SwiperItem, Image, ScrollView} from '@tarojs/components';
import './index.less'
import Taro from '@tarojs/taro';
import {useEffect, useState} from 'react';

export default function Home() {
  const [bannerList,setBannerList] = useState([])
  const [playlist,setPlayList] = useState([])
const getBanner = async ()=>{
  const res = await  Taro.request({
    url:'https://netease.gujiwuqing.top/banner?type=0',
  })
  setBannerList(res.data?.banners||[])
}

const getPlayList =async ()=>{
  const res = await  Taro.request({
    url:'https://netease.gujiwuqing.top/personalized',
    data:{
      limit:24
    }
  })
  setPlayList(res.data?.result||[])
}

useEffect(()=>{
  getBanner();
  getPlayList();
},[])
  return (
    <View className='index'>
      <Swiper
        className='test-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        vertical={false}
        circular
        indicatorDots
        autoplay
      >
        {
          bannerList.map(item=>{
            return (
              <SwiperItem key={item.targetId}>
                <Image src={item.imageUrl} style={{width:'100%'}}/>
              </SwiperItem>
            )
          })
        }
      </Swiper>
     <View>
       <View className='title'>推荐歌单</View>
       <ScrollView
         enableFlex
         scrollX
         scrollY={false}
         style={{display:'flex'}}
         scrollWithAnimation
       >
         {
           playlist.map(item=>{
             return (
               <View style={{display:'flex',flexDirection:'column',marginLeft:10,marginTop:10}} className='play-item'>
                 <Image src={item.picUrl} style={{width:120,height:120}}/>
                 <Text className='name'>{item.name}</Text>
               </View>
             )
           })
         }
       </ScrollView>
     </View>
    </View>
  )
}
