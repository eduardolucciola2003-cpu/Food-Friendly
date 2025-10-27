import React, { useEffect, useState } from 'react';import { View, Text, SafeAreaView, FlatList } from 'react-native';
const API = process.env.API_BASE || 'http://localhost:4000/api';
export default function Home(){
  const [data,setData]=useState([]);
  useEffect(()=>{ fetch(API+'/restaurants').then(r=>r.json()).then(setData).catch(()=>{}); },[]);
  return <SafeAreaView style={{flex:1,padding:16}}>
    <Text style={{fontSize:22,fontWeight:'800'}}>Food Friendly</Text>
    <FlatList data={data} keyExtractor={i=>i.id} renderItem={({item})=> <View style={{padding:8,borderBottomWidth:1,borderColor:'#eee'}}><Text style={{fontWeight:'700'}}>{item.name}</Text><Text>{item.address} — {item.city}</Text></View> } />
  </SafeAreaView>;
}