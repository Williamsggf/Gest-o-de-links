import { useCallback, useState } from "react";
import { Text, View, Image, TouchableOpacity, FlatList, Modal, Alert } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Categories } from "@/components/Categories"; // Verifique se este caminho está correto.
import { categories } from "@/utils/caregories";
import { Link } from "@/components/link";
import { Option } from "@/components/Option";
import { router, useFocusEffect } from "expo-router";
import { LinksSorage, linksStorage } from "@/storage/link-storage"; // Corrigir nome para LinksSorage

export default function Index() {
    const [showModal, setShowModal] = useState(false);
    const [link, setLink] = useState<LinksSorage>({} as LinksSorage);
    const [links, setLinks] = useState<LinksSorage[]>([]);
    const [category, setCategory] = useState(categories[0].name);

    async function getLinks() {
        try {
            const response = await linksStorage.get();

            const filtered = response.filter((link: LinksSorage) => link.category === category);

            setLinks(filtered);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível listar os links");
        }
    }

    function handleDetails(selected: LinksSorage) {
        setShowModal(true);
        setLink(selected);
    }

    useFocusEffect(
        useCallback(() => {
            getLinks();
        }, [category])
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require("@/assets/logo.png")} style={styles.logo} />

                <TouchableOpacity onPress={() => router.navigate("/add")}>
                    <MaterialIcons name="add" size={32} color={colors.green[300]} />
                </TouchableOpacity>
            </View>

            <Categories onChange={setCategory} selected={category} />

            <FlatList
                data={links}
                keyExtractor={item => item.id}
                renderItem={({ item }) => ( // Corrigido o uso correto de 'item'
                    <Link
                        name={item.name}
                        url={item.url}
                        onDetails={() => handleDetails(item)}
                    />
                )}
                style={styles.links}
                contentContainerStyle={styles.linksContainer}
                showsVerticalScrollIndicator={false}
            />

            <Modal transparent visible={showModal} animationType="slide">
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalCategory}>{link.category}</Text>
                            <MaterialIcons name="close" size={24} color={colors.gray[400]} onPress={() => setShowModal(false)} />
                        </View>

                        <Text style={styles.modalLinksName}>{link.name}</Text>
                        <Text style={styles.modalUrl}>{link.url}</Text>

                        <View style={styles.modalFooter}>
                            <Option name="Excluir" icon="delete" variant="secondary" />
                            <Option name="Abrir" icon="language" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
