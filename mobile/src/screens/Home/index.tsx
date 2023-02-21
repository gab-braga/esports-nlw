import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import logoImage from '../../assets/logo-nlw-esports.png';
import { Head } from '../../components/Head';
import { GameCard, GameCardProps } from '../../components/GameCard';
// import { GAMES } from '../../utils/games';
import { useEffect, useState } from 'react';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export function Home() {

  const navigation = useNavigation();

  const [games, setGames] = useState<GameCardProps[]>([]);

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  useEffect(() => {
    axios.get("http://192.168.0.3:3000/games")
      .then(response => setGames(response.data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImage} style={styles.logo} />

        <Head title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...' />

        <FlatList horizontal data={games} keyExtractor={item => item.id} renderItem={({ item }) => (
          <GameCard data={item} onPress={() => handleOpenGame(item)} />
        )} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentList} />
      </SafeAreaView>
    </Background>
  );
}