import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";

export function Input({ ...rest }: TextInputProps) {
    return (
        <TextInput
            style={[styles.container, {color: colors.gray[200]}]}
            placeholderTextColor={colors.gray[400]}
            
            {...rest}
        />
    )
}
