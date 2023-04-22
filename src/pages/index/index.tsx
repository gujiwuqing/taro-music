import {View, Text, Swiper, SwiperItem, Image} from '@tarojs/components';
import './index.less'
import Taro from '@tarojs/taro';
import {useEffect, useState} from 'react';

export default function Home() {
  const [bannerList,setBannerList] = useState([])
const getBanner = async ()=>{
  const res = await  Taro.request({
    url:'https://netease.gujiwuqing.top/banner?type=0',
  })
  setBannerList(res.data?.banners||[])
  console.log(res);
}

useEffect(()=>{
  getBanner()
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
    </View>
  )
}
