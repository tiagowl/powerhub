import {Document, Page, StyleSheet, View, Text} from "@react-pdf/renderer";
import { Workout } from "../global/interfaces";

interface Props{
    data: Workout[]
    student: string;
}

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    student:{justifyContent: "center", width: "80%", marginTop: "15px", marginBottom: "15px"},
    studentFont:{ fontWeight: "bold" },
    logo:{ justifyContent: "center", width: "80%", marginTop: "15px", marginBottom: "20px"},
    tableHeader:{backgroundColor: "#d65a00", height: "30px", alignItems: "center", justifyContent: "center", borderBottom: "1px solid black"},
    tableHeaderFontColor: {color: "#ffffff", fontWeight: "bold"},
    table: {width: "80%", border: "2px solid #a0a0a1" }, 
    tableRow: { margin: "auto", flexDirection: "row" }, 
    tableCol: { width: "25%"}, 
    tableCell: { margin: "auto", marginTop: 5, fontSize: 10 }
})

 const Pdf = ({data, student}: Props) =>(
    <Document>
        <Page size="A4" style={styles.page}  >
            <View style={styles.logo} >
                <Text>PowerHUB</Text>
            </View>
            <View style={styles.table}> {/* TableHeader */} 
                <View style={[styles.tableRow, styles.tableHeader]}> 
                    <View style={styles.tableCol}> 
                        <Text style={[styles.tableCell, styles.tableHeaderFontColor]}>Descrição</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={[styles.tableCell, styles.tableHeaderFontColor]}>Carga</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={[styles.tableCell, styles.tableHeaderFontColor]}>Repetições</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={[styles.tableCell, styles.tableHeaderFontColor]}>Séries</Text> 
                    </View> 
                </View> {/* TableContent */} 
                {data?.map((workout, index)=>(
                    <View style={[styles.tableRow, {backgroundColor: index % 2 === 1 && index != 0 ? "#e5a300" : "#ffffff"}]}> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{workout?.exercicie}</Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{workout?.load}</Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{workout?.repetitions}</Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{workout?.series}</Text> 
                        </View> 
                    </View> 
                ))}
            </View>
        </Page>
    </Document>
 )
    


export default Pdf;