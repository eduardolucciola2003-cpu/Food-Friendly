import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FilterChips({filters, setFilters}){
  function toggle(key){
    setFilters(prev => ({...prev, [key]: !prev[key]}));
  }
  return (
    <View style={styles.row}>
      {['veg','nonveg','halal','nonhalal'].map(k => (
        <TouchableOpacity key={k} onPress={()=>toggle(k)} style={[styles.chip, filters[k] && styles.chipOn]}>
          <Text style={[styles.text, filters[k] && styles.textOn]}>{k.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection:'row', flexWrap:'wrap', gap:8, marginVertical:8 },
  chip: { paddingVertical:8, paddingHorizontal:12, borderRadius:20, borderWidth:1, borderColor:'#ccc' },
  chipOn: { backgroundColor:'#16A34A', borderColor:'#16A34A' },
  text: { color:'#333', fontWeight:'600' },
  textOn: { color:'#fff' }
});
