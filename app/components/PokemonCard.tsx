import { useEffect, useState } from "react"
import {useAnimation, motion} from "framer-motion"
import Image from "next/image"
import Type from "./Type"
import { ClipLoader } from "react-spinners"

export interface Pokemon {
    url:string,
    name:string
}

interface Ability {
    ability: {
        name:string
    }
}

interface PokemonData {
    height: number,
    weight: number,
    abilities: Ability[]
    types: {
        type: {name:string}
    }[]
}

interface Props {
    pokemon:Pokemon
}

const PokemonCard:React.FC<Props> = ({pokemon}) => {

    const [data, setData] = useState<PokemonData | null>(null)
    const [isFlipped, setIsFlipped] = useState(false)

    const controls = useAnimation()

    useEffect(()=>{
        const fetchPokemon = async () => {
            try {
                const response = await fetch(pokemon.url)
                if(!response.ok){
                    throw new Error("failed to fetch Pokemon data")
                }
                const fetchedData: PokemonData = await response.json()

                setData(fetchedData)
            }
            catch(error) {
                console.log(error)
                return null
            }
        }

        fetchPokemon()
    },[])

    const getPokemonNumberFromURL = (url: string): string | null => {
        const matches = url.match(/\/(\d+)\/$/);
        return matches ? matches[1] : null;
    }

    const pokemonNumber = getPokemonNumberFromURL(pokemon.url)

    const flippedCard = async () => {
        setIsFlipped(!isFlipped)
        await controls.start({rotateY: isFlipped ? 0 : 180})
    }

    const formatPokemonNumber = (number:string):string => {
        return `#${String(number).padStart(4, "0")}`
    }

    const formatMeasurement = (value:number, unit:string) : string => {
        return `${value} ${unit}`
    }

    const [loading, setLoading] = useState(true);

  return (
    <div className="flex items-center justify-center flex-col relative mb-8">

    <motion.div
    className="cursor-pointer"
    animate={controls}
    whileHover={{scale:0.95}}
    whileTap={{scale:0.90}}
    onClick={flippedCard}
    >
        <motion.div
        className="bg-gray-600 flex items-center rounded-full p-1 relative shadow-lg"
        initial={{rotateY:0}}
        variants={{
            front:{rotateY:0},
            back: {rotateY:180}
        }}
        animate={isFlipped ? "back" : "front"}
        >

            {/* add a loader for image */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <ClipLoader color="white" />
                </div>
            )}

            <div className="absolute top-0 left-0 text-black/60 font-bold px-2 text-xl bg-white rounded-full">
                {
                    !isFlipped && formatPokemonNumber(pokemonNumber || "")
                }
            </div>
            {
                !isFlipped ? (                   
                    <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`}
                    width={220}
                    height={220}
                    alt="Pokemon Image"
                    className="z-[99999]"
                    onLoad={() => setLoading(false)}
                    />
                ) : (
                    <div className="w-[220px] h-[220px] bg-gray-700 rounded-full flex items-center justify-center">

                        <div className="text-white flex flex-col gap-1 text-center">
                            <p className=" px-2 rounded-full text-sm">
                                Height: {" "}{data?.height && formatMeasurement(data.height/10, "meters")}
                            </p>
                            <p className=" px-2 rounded-full text-sm">
                                Weight: {" "}{data?.weight && formatMeasurement(data.weight/10, "meters")}
                            </p>
                            <div className="flex flex-col text-center mt-2">
                                <h3 className="font-bold text-lg underline mb-2">
                                    Abilities: 
                                </h3>
                                {
                                    data?.abilities && data.abilities.map((ability, index) => (
                                        <span key={index}>
                                            {ability.ability.name}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                )
                
            }
        </motion.div>
    </motion.div>

    <span className="font-bold px-1 rounded-md my-5 uppercase text-white">
            {pokemon.name}
    </span>
    <span className="flex gap-5">
            {
                data?.types && data.types.map((type, index) => (
                    <Type 
                    key={index} 
                    typeName={
                        type.type.name as | "fire" | "grass" | "water" | "electric" | "poison"
                    }
                     />
                ))
            }
    </span>

    </div>
  )
}

export default PokemonCard