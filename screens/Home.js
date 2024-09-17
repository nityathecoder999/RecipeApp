import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import tw from 'twrnc';
import Category from '../components/Category';
import Recipes from '../components/Recipes';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [active, setActive] = useState('Dessert');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRecipes = async (category = "Dessert") => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.meals) {
          setMeals(data.meals);
        }
      } else {
        console.error('Fetch request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setSearchQuery('');
    setActive(category);
    setMeals([]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      getRecipes(active);
    } else {
     
      const filteredMeals = meals.filter((meal) => meal.strMeal.toLowerCase().includes(query.toLowerCase()));
      setMeals(filteredMeals);
  };
  }
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 5 }}
        className="space-y-6 pt-14"
      >

        {/* Header */}
        <View className='mx-4 flex-row justify-between items-center mb-2'>
          <Image style={{ height: hp(7), width: hp(7.5) }} source={{ uri: 'https://previews.123rf.com/images/vladwel/vladwel2005/vladwel200500024/146989880-user-profile-or-my-account-avatar-login-icon-with-man-male-face-smile-symbol-flat-vector-human.jpg' }}></Image>
          <BellIcon size={hp(4)} color='grey' />
        </View>

        {/* Greetings */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(2.5) }} className="text-neutral-600">Hello Nitya</Text>
          <Text style={{ fontSize: hp(3.8) }} className=" font-semibold text-neutral-600">Become a MasterChef</Text>
          <Text style={{ fontSize: hp(3.8) }} className=" font-semibold text-neutral-600">Prepare tasty <Text className="texrt-500" style={{color:'#A2CA71'}}>Food</Text></Text>
        </View>

        {/* Search Input */}
        <View className="mx-4 flex-row items-center p-[6px] rounded-full bg-black/5">
          <TextInput
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            placeholder='Search Any Recipe'
            placeholderTextColor={'grey'}
            style={{ fontSize: hp(2.5) }}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={'grey'} />
          </View>
        </View>

        {/* Categories */}
        <View>
          {categories.length > 0 && <Category categories={categories} active={active} handleChangeCategory={handleChangeCategory} />}
        </View>

        {/* Recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>

      </ScrollView>
    </View>
  );
}