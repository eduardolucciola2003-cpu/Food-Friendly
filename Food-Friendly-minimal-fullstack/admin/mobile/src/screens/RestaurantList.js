import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { fetchRestaurants } from '../api';
import FilterChips from '../components/FilterChips';

export default function RestaurantList({ navigation }){
  const [filters, setFilters] = useState({ veg: false, nonveg: false, halal: false, nonhalal: false});
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRestaurants(filters).then(setData);
  }, [filters]);

  return (
    <SafeAreaView style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:22, fontWeight:'800' }}>Restaurants</Text>
      <FilterChips filters={filters} setFilters={setFilters} />
      <FlatList
        data={data}
        keyExtractor={(item)=>item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('Menu', { id: item.id, name: item.name, filters })}
            style={{ padding:14, borderBottomWidth:1, borderColor:'#eee' }}>
            <Text style={{ fontSize:16, fontWeight:'700' }}>{item.name}</Text>
            <Text style={{ color:'#666' }}>{item.address}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
