import Image from "next/image"

const Navbar = () => {
  return (
    <div className="py-5 mt-10">

        <div className="max-w-[1500px] w-[90%] mx-auto flex justify-center">

            <Image src={"/pokemon.svg"} 
            width={300}
            height={158}
            alt="PokeDex logo"
            />

        </div>

    </div>
  )
}

export default Navbar