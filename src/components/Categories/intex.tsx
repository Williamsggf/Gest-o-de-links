import { FlatList } from "react-native";
import { categories } from "@/utils/caregories";
import { Category } from "@/components/Category";
import { styles } from "./styles";

type Props = {
    selected: string
    onChange: (category: string) => void

}

export function Categories({ selected, onChange }: Props) {
    return (
        <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Category
                    name={item.name}
                    icon={item.icon}
                    isSelected={item.name === selected}
                    onPress={() => onChange(item.name)}
                />
            )}
            horizontal
            style={styles.continer}
            contentContainerStyle={styles.content}
            showsHorizontalScrollIndicator={false}
        />
    )
}