import { fetchPokemon } from "./actions/getPokemon";
import LoadPokemon from "@/app/components/LoadPokemon";
import Search from "@/app/components/Search"

const Page = async({searchParams} : {searchParams: {
  [key: string]: string | string[] | undefined
}}) => {

  const search = typeof searchParams.search === "string" 
  ? searchParams.search
  : undefined;

  const pokemon = await fetchPokemon({search});

  return (
    <div className="max-w-[800px] w-[90%] mx-auto">
      <Search search={search} />
      <ul key={Math.random()}>
        <LoadPokemon 
          search={search}
          initialPokemon={pokemon}
        />
      </ul>
    </div>
  )
}

export default Page