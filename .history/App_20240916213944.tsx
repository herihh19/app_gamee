import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Linking,
  SafeAreaView,
} from "react-native";
import games, { Game } from "./src/data/games"; // Importando a interface Game

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null); // Definindo o tipo de selectedGame
  const [modalVisible, setModalVisible] = useState(false);

  // Função para filtrar jogos
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para abrir modal do trailer
  const openModal = (game: Game) => {
    setSelectedGame(game);
    setModalVisible(true);
  };

  // Função para fechar modal
  const closeModal = () => {
    setSelectedGame(null);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Aplicativo de Jogos</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar jogos"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      {/* Lista de Jogos */}
      <FlatList
        data={filteredGames.sort((a, b) => a.name.localeCompare(b.name))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.gameImage} />
              <View style={styles.cardContent}>
                <Text style={styles.gameTitle}>{item.name}</Text>
                <Text>Plataforma: {item.platform}</Text>
                <Text>Gênero: {item.genre}</Text>
                <Text>Lançamento: {item.releaseDate}</Text>
                <Text>Classificação: {item.rating}</Text>
                <Text>Desenvolvedor: {item.developer}</Text>
                <Text>Nota: {item.ratingScore}/5</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text>© 2024 - Aplicativo de Games</Text>
      </View>

      {/* Modal para Trailer */}
      {selectedGame && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Verificação se selectedGame está definido */}
              <Text style={styles.modalTitle}>{selectedGame.name}</Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`https://www.youtube.com/results?search_query=${selectedGame.name}+trailer`)
                }
              >
                <Text style={styles.modalText}>Assistir Trailer no YouTube</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#6200EE",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    width: "100%",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  gameImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    backgroundColor: "#1E90FF",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#6200EE",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
