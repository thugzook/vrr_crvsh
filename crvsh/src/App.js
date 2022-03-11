import { useEffect, useState } from "react";

function App() {
  const collections = [
    {
      name: "Bored Ape Yacht Club",
      url: "https://api.opensea.io/collection/boredapeyachtclub",
    },
    {
      name: "Azuki",
      url: "https://api.opensea.io/collection/azuki",
    },
    {
      name: "Cool Cats",
      url: "https://api.opensea.io/collection/cool-cats-nft",
    },
    {
      name: "BAKC",
      url: "https://api.opensea.io/collection/bored-ape-kennel-club",
    },
    {
      name: "Doodles",
      url: "https://api.opensea.io/collection/doodles-official",
    },
    // More people...
  ];

  const [collectionsData, setCollectionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState();

  function fetchCollections() {
    setLoading(true);
    let collectionsArray = [];

    // GET for each NFT collection in collections
    collections.map((collection, index) => {
      fetch(collection.url)
        .then((response) => response.json())
        .then((data) => {
          let nftData = data.collection;
          collectionsArray[index] = nftData;
          const f = [...removeUndef(collectionsArray)];
          setCollectionsData(f);

          let calledTime = new Date().toLocaleString();
          setTime(calledTime);
        });
    });

    // console.log(collectionsArray);
    // set state variable

    setLoading(false);
  }

  function removeUndef(data) {
    let array = [];
    data.forEach((item) => {
      if (item != undefined) {
        array.push(item);
      }
    })
    return(array);
  }

  console.log("collectionsData state", collectionsData);
  useEffect(() => {
    // initialize nft collection values
    fetchCollections();
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-700">
      <div className="bg-slate-700">
        <h1 className="pt-32 text-4xl font-semibold text-center text-slate-200">
          Simple VRR Calculator
        </h1>
      </div>

      <div className="relative w-3/6 h-auto mx-auto mt-24 rounded-md bg-slate-300">
        <div className="p-6 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Collections
              </h1>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                onClick={() => fetchCollections()}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Refresh Data
              </button>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Supply
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Floor
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Volume (1000s)
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          VRR
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {collectionsData.length > 0 &&
                        !loading &&
                        collectionsData.map((collection, index) => {

                          if (collection == undefined) {
                            return
                          }
                          if (collection != undefined) {
                            const supply = collection.stats.total_supply;
                            const floor_price = collection.stats.floor_price;
                            const total_volume = (collection.stats.total_volume / 1000).toFixed(3);
                            const vrr = ((total_volume / floor_price) * (supply / 10000)).toFixed(2); 
                            return (
                              <tr key={collection.name}>
                                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                                  {collection.name}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                  {supply}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                  {floor_price}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                  {total_volume}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                  {vrr}
                                </td>
                              </tr>
                            );
                          }
                          
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <body className="items-center mx-auto mt-10 text-center">
        <p className=" text-slate-300">
          Simple VRR calculator. Pulls from OpenSea.
        </p>
        <p className="italic text-slate-500">
          {"Last Updated: " + time}
        </p>
      </body>
      
    </div>
  );
}

export default App;

function Table(props) {
  const { array } = props;
  return <></>;
}
