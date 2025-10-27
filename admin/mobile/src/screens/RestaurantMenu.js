import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { fetchMenu } from '../api';
import FilterChips from '../components/FilterChips';

export default function RestaurantMenu({ route }){
  const { id, name, filters: initFilters } = route.params;
  const [filters, setFilters] = useState(initFilters || { veg:false, nonveg:false, halal:false, nonhalal:false });
  const [restaurant, setRestaurant] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchMenu(id, filters).then(({restaurant, items}) => { setRestaurant(restaurant); setItems(items); });
  }, [filters]);

  return (
    <SafeAreaView style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:22, fontWeight:'800' }}>{name}</Text>
      <FilterChips filters={filters} setFilters={setFilters} />
      <FlatList
        data={items}
        keyExtractor={(item)=>item.id}
        ListEmptyComponent={<Text>No items for current filters.</Text>}
        renderItem={({item}) => (
          <View style={{ padding:14, borderBottomWidth:1, borderColor:'#eee' }}>
            <Text style={{ fontSize:16, fontWeight:'700' }}>{item.name} — €{(item.priceCents/100).toFixed(2)}</Text>
            <Text>{item.description}</Text>
            <Text style={{ marginTop:6, fontSize:12 }}>
              [{item.diet === 'veg' ? 'Veg' : 'Non-Veg'}] [{item.isHalal ? 'Halal' : 'Non-Halal'}]
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
