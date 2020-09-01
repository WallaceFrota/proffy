import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7'
    },
    teacherList: {
        marginTop: -40,
    },
    searchForm: {
        marginBottom: 8
    },
    label: {
        color: '#d4ceff',
        fontFamily: '400'
    },
    input: {
        height: 54,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16
    },
    inputWeekTime: {
        borderRadius: 0
    },
    inputGroup: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    inputBlock: {
        width: '48%'
    },
    btnSearch: {
        height: 56,
        backgroundColor: '#04d361',
        width: '100%',
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12
    },
    textButton: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})

export default styles;