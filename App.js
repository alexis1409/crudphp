import React, {useState, useEffect} from 'react';
import {
  Container, 
        Header,
        Content, 
        Card,
        CardItem,
        Item,Input,
        Body,Text,Button, View, TextInput, StyleSheet
} from 'react-native';

import axios from 'axios';

const App = () => {

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');

  const [lista, setLista] = useState([]);

  const guardar = async () => {

    const obj = {nombre, precio, cantidad}
    console.log(obj);
    try {

       const res = await axios.post('http://192.168.0.18:8080/backend-php-producto-master/producto.php',obj);
       console.log(res);

  } catch (error) {
      console.log(error) 
  }
  
  setNombre('');
  setPrecio('');
  setCantidad('');
}

//listar datos 
const listar = async () => {
  try {
     const res = await axios.get('http://192.168.0.18:8080/backend-php-producto-master/listar.php');
     setLista(res.data)
       
    } catch (error) {
     console.log(error)
   }
}

useEffect(() => {
  listar();
},[])

  return (
    <View style={styles.container}>

      <TextInput 
        style={{width:400, height:50, fontSize:22,margin:10}}
        placeholder="Nombre"
        onChangeText={nombre => setNombre(nombre)}
        value={nombre}
      />

      <TextInput 
        style={{width:400, height:50, fontSize:22,margin:10}}
        placeholder="Precio"
        onChangeText={precio => setPrecio(precio)}
        value={precio}
      />

      <TextInput 
        style={{width:400, height:50, fontSize:22,margin:10}}
        placeholder="Cantidad"
        onChangeText={cantidad => setCantidad(cantidad)}
        value={cantidad}
      />

      <Button 
        title="Guardar"
        onPress={() => guardar()}
      />

      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'stretch'
  }
});

export default App;
