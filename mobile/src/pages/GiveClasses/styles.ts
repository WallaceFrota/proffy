import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8257E5',
        justifyContent: "center",
        padding: 40
    },
    content: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
        maxWidth: 180,
        marginBottom: 24,
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        lineHeight: 37
    },
    description: {
        fontSize: 16,
        lineHeight: 26,
        color: '#d4c2ff',
        maxWidth: 210
    },
    button: {
        height: 52,
        width: '100%',
        backgroundColor: '#04d361',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 40
    },
    textButton: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default styles;