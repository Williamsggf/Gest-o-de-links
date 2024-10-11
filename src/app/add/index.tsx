import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Categories } from "@/components/Categories/intex";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { linksStorage } from "@/storage/link-storage";



export default function Add() {
    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")

    async function handleAdd() {
        try {
            if (!category) {
                return Alert.alert("Categoria", "Selecione uma categoria")
            }
            if (!name.trim) {
                return Alert.alert("Nome", "Informe um nome")
            }
            if (!url.trim) {
                return Alert.alert("Url", "Digite uma url")
            }

            await linksStorage.save({ id: Date.now().toString(), name, url, category })

            Alert.alert("Sucesso", "Link adicionado com sucesso")

        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar o link")
            console.log(error)
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
                </TouchableOpacity>
                <Text style={styles.title}>Novo</Text>
            </View>
            <Text style={styles.label}>Selecione uma categoria</Text>
            <Categories onChange={setCategory} selected={category} />
            <View style={styles.form}>
                <Input
                    placeholder="Nome"
                    onChangeText={setName}
                    autoCorrect={false}
                />
                <Input
                    placeholder="Url"
                    onChangeText={setUrl}
                    autoCorrect={false}
                    autoCapitalize="none"
                />
                <Button title="Adicionar" onPress={handleAdd} />
            </View>
        </View>

    )
}