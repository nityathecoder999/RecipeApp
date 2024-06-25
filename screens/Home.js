import {View, Text, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native'
import {useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'
import {Bellicon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import tw from 'twrnc'
import Category from '../components/Category'
import Recipes from '../components/Recipes'


export default function Home(){
  const [searchQuery, setSearchQuery] = useState('')
  const [meals,setMeals] = useState([])
  const [categories, setCategories] = useState([])
  const [active, setActive] = useState('Dessert')

  useEffect(()=> {
    getCategories();
    getRecipes()
  },[])

  const getCategories = async () => {
    try{
      const response = await 
      axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
      if(response && response.data){
        setCategories(response.data.categories)

      }
    }catch(error){
      console.log(error)
    }
  }

  const getRecipes = async(category = 'Dessert') =>{
    try{
      const response = await
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      if(response.ok){
        const data = await response.json();
        if(data && data.meals) {
          setMeals(data.meals);
        }
      }else{
        console.error('Fetch request failed with status:', response.status)
      }
    }catch(error){
      console.error('Error fetching data:', error)
    }
  }
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      getRecipes(active);
    } else {

      const filteredMeals = meals.filter((meal) => meal.strMeal.toLowerCase(). includes(query.toLowerCase()));
      setMeals(filteredMeals)
    }
  }

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setSearchQuery('');
    setActive(category);
    setMeals([]);
  }

return(
  <View style={{flex:1, backgroundColor:'white'}}>
   <StatusBar style='dark'/>
     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 5 }} style={{paddingTop:14}}>
          <View style={{marginHorizontal:4, flexDirection:'row', justifyContent:'between', alignItems:'center', marginBottom:2}}>
            <Image style={{height:hp(7),width:hp(7.5)}} source={{uri:'https://previews.123rf.com/images/vladwel/vladwel2005/vladwel200500024/146989880-user-profile-or-my-account-avatar-login-icon-with-man-male-face-smile-symbol-flat-vector-human.jpg' }}/>
          </View>
          <View >
            <Text className="text-neutral-600" style={{FontSize:hp(2.5)}}> Hello Nitya</Text>
            <Text style={{FontSize:hp(3.8)}} className="font-semibold text-neutral-600">Become a Master Chef</Text>
            <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">Prepare Tasty <Text className="text-amber-500">Food</Text></Text>
          </View>
          <View>
            <TextInput
            className="flex-1 text-base mb-1 pl-3 tracking-wider" 
            placeholder='Search Any Recipe' placeHolderTextColor={'grey'}
            style={{fontSize:hp(2.5)}}
            value={searchQuery}
            onChangeText={handleSearch} />
            <View className='bg-white rounded-full p-3'>
              <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={'grey'}/>
            </View>
          </View>
          
          <View>
          {categories.length > 0 && <Category categories={categories} active={active} handleChangeCategory={handleChangeCategory} />}
        </View>
        
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
          


    </ScrollView> 
  </View>
  )
}