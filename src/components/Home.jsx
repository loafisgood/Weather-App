
import Header from './Header.jsx'


import {useState, useEffect} from 'react'
import './Weather.css'
import { Box, Stack,HStack, Icon } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { BsSun, BsCloudSun, BsThermometerSun }from 'react-icons/bs'
import AOS from "aos";
import "aos/dist/aos.css";


const Home = () => {
    const [data, setData] = useState([])
    const [city, setCity] = useState('')


    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
    


    const handleInput = (e) => {
        setCity(e.target.value)
        
    }


 
    const url = "https://api.openweathermap.org/data/2.5/weather?q="
    const key = '01d59ed194eb7582e16cc1e34745a696'

    
    const searchCity =  async (title) => {
        try{
            const response = await fetch(`${url}${title}&appid=${key}&units=metric`)
            const json = await response.json()
            console.log(json);
            setData(json)
        } catch(error) {
            console.log('ERROR', error);
            
        }
    }


    


    

  return (
    <div  >
        <Box color='26355E' overflow={'hidden'}>


            

            <Header/>
            
            
            <Box className={'Box'} data-aos='fade-up'>
                
                <HStack spacing={4} className={'HStack'} position="relative" left={'40%'} paddingTop={'100px'}>
                    <Search2Icon color='white' height={"25px"} width={'25px'}/>
                    <Input type="text" placeholder='Search City' variant='outline' onChange={handleInput} className={'input'} backgroundColor={'white'}>
                    </Input>
                    <Button colorScheme="blue" onClick={() => searchCity(city)}>Search</Button>

                 
                    
                    
                   
                </HStack>
            
                <Stack className="weatherdata" marginTop={'100'} >





                    

                    <h1 fontSize="2rem">
                        {data.name}   {data.sys== undefined? null : "- " + data.sys.country}
                    </h1>


                    <HStack className={'HStack'} fontSize={'4rem'}> 
                        <h3>
                            {(() => {
                                if (data.main !== undefined) {
                                    if (data.main.temp > 20) {
                                        return  <BsSun/>   
                                                   
                                    } 
                                    else if(data.main.temp > 10 || data.weather.main == 'Clouds'){
                                        
                                        return <BsCloudSun/> 

                                    }
                                    else if (data.main.temp > 30) {
                                        return <BsThermometerSun/>
                                    }
                                }
                            })()}
                            
                        </h3>
                        <h3>
                            {data.main == undefined ? null: data.main.temp + "°C"}
                        </h3>
                    </HStack>

                    <h1 size={"0.5em"}>
                        {data.weather == undefined ? null: data.weather[0].main}
                    </h1>

                    {data.wind == undefined ? null : 
                    <Box className={'Attributes'} position={'relative'} bottom={'-35'}>
                        <h4 fontSize={"2rem"} color="white" opacity="100">
                            {data.wind == undefined ? null : " Wind Speed: " + data.wind.speed + " m/s  "}

                        </h4>
                        <h4 fontSize={"2rem"} color="white" opacity="100">


                            {data.main == undefined ? null : " Feels like: " + data.main.feels_like + "°C  "}

                        </h4>
                        <h4 fontSize={"2rem"} color="white" opacity="100">
                            {data.main == undefined ? null : " Min Temp: " + data.main.temp_min + "°C  "}
                        </h4>
                        <h4 fontSize={"2rem"} color="white" opacity="100">
                            {data.main == undefined ? null : " Max Temp: " + data.main.temp_max + "°C  "}
                        </h4>
                    </Box>}Humidity
               
    


                
                </Stack>

            
            </Box>
      
       
        </Box>

    </div>
  )
}



export default Home; 
