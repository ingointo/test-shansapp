import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import moment from 'moment'
import Date from './Date'

export default function Calender({onSelected,selcted}){
    const [dates, setDates] = useState([])
    const [scrollPosition, setScrollPosition] = useState(0)
    const [currentMonth, setCurrentMonth] = useState()

    const getDates=()=>{
        const _dates=[]
        for(let i=0;i<10;i++){
            const date = moment().add(i,'days')
            _dates.push(date)
        }
    }
    useEffect(()=>{
        getDates()
    },[])

    return(
        <>
        <View style={styles.centered}>
            <Text style={styles.title}>Current month</Text>
        </View>
        <View style={styles.dateSection}>
            <View style={styles.scroll}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {dates.map((date, index) => (
                <Date
                    key={index}
                    date={date}
                    onSelectDate={onSelectDate}
                    selected={selected}
                />
                ))}
            </ScrollView>
            </View>
        </View>
    </>
    )
}

const styles = StyleSheet.create({
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    dateSection: {
        width: '100%',
        padding: 20,
    },
    scroll: {
        height: 150,
    },
})