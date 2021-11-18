import React from "react";
import type {
  GetServerSideProps,
  NextPage,
  GetServerSidePropsContext,
} from "next";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import {
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Text,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import CategoriesBadge from "../pages-components/Home/CategoriesBadge";
import { GiDualityMask, GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BookListItem from "../pages-components/Home/BookListItem";
import Select from "../components/Select";
import { DonatedBook } from "../models/domain/DonatedBook";
import { getBooks, getFilteredBooks } from "../services/books";
import { states, cities, City } from "../config/constants";
import FilterBadge from "../pages-components/Home/FilterBadge";

export type FilterParams = {
  label: string;
  value: string;
  field: string;
};

type Props = {
  books: DonatedBook[];
};

const Home: NextPage<Props> = (props) => {
  const router = useRouter();
  const { sizes } = useTheme();

  const [isLoading, setLoading] = React.useState(false);
  const [books, setBooks] = React.useState<DonatedBook[]>([]);

  //Filters
  const [searchFilter, setSearchFilter] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");
  const [filteredCities, setFilteredCities] = React.useState<City[]>(cities);
  const [filters, setFilters] = React.useState<FilterParams[]>([]);

  React.useEffect(() => {
    (async () => {
      if (router.query["busca"]) {
        setSearchFilter(router.query.busca as string);
      }

      if (props && props.books) {
        setBooks(props.books);
      } else {
        await fetchBooks();
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    updateFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter, selectedState, selectedCity]);

  const fetchBooks = async () => {
    setLoading(true);

    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (err) {
      // Toast
      console.log("fetchBooks error", err);
    } finally {
      setLoading(false);
    }
  };

  const onStateChange = (id: string) => {
    setSelectedState(id);

    if (id) {
      const filterCityResult = cities.filter(
        (city) => Number(id) == city.stateId
      );
      setFilteredCities(filterCityResult);
      setSelectedCity('');

      const cityResultIndex = filters.findIndex(f => f.field === 'city');
      if(cityResultIndex){ 
        const newFilters = [...filters];
        newFilters.splice(cityResultIndex, 1);

        setFilters(newFilters);
      }
    } else {
      setFilteredCities(cities);
    }
  };

  const onCityChange = (id: string) => {
    setSelectedCity(id);
  };

  const updateFilters = () => {
    const newfilters: FilterParams[] = [];

    if (searchFilter) {
      newfilters.push({
        field: "bookName",
        label: "Nome",
        value: searchFilter,
      });
    }

    if (selectedState) {
      const stateResult = states.find(
        (state) => state.id === Number(selectedState)
      );

      if (stateResult)
        newfilters.push({
          field: "state",
          label: "Estado",
          value: stateResult.name,
        });
    }

    if (selectedCity) {
      const cityResult = cities.find(
        (city) => city.id === Number(selectedCity)
      );

      if (cityResult)
        newfilters.push({
          field: "city",
          label: "Cidade",
          value: cityResult.name,
        });
    }

    setFilters(newfilters);
  };

  const onRemoveFilter = (index: number) => {
    const arrayToRemove = [...filters];

    const removed = arrayToRemove.splice(index, 1);
    const filterRemoved = removed[0];

    if(filterRemoved.field === 'bookName') {
      setSearchFilter('')
    } else if(filterRemoved.field === 'state') {
      setSelectedState('');
    } else if(filterRemoved.field === 'city') {
      setSelectedCity('');
    }

    setFilters(arrayToRemove);
  }

  const handleFilter = async () => {
    const filtersParams = {} as any;
    
    if(filters.length) {
      filters.forEach(f => {
        filtersParams[f.field] = f.value;
      }) 
    }

    try {
      console.log('filterparams', filtersParams);
      const response = await getFilteredBooks(filtersParams);
      
      setBooks(response.data);
      updateFilters();
    } catch(error) {
      console.log('handleFilter', error);
    }
  };

  return (
    <Layout>
      <Flex
        width="100%"
        minHeight={`calc(100vh - ${sizes.headerHeight} - ${sizes.footerHeight})`}
        justifyContent="center"
      >
        <Flex direction="column" maxWidth="maxWidthLayout" width="100%">
          <Heading fontSize="2xl" mt="6" mb="6" textAlign="center">
            Livros que estão sendo doados no momento:
          </Heading>

          {/* <HStack spacing="2.5rem" justifyContent="space-between" mb="6">
            <CategoriesBadge categoryName="Arte" icon={GiDualityMask} />
            <CategoriesBadge categoryName="Arte" icon={GiDualityMask} />
            <CategoriesBadge categoryName="Arte" icon={GiDualityMask} />
            <CategoriesBadge categoryName="Arte" icon={GiDualityMask} />
            <CategoriesBadge categoryName="Arte" icon={GiDualityMask} />
            <CategoriesBadge categoryName="Arte" icon={GiDualityMask} />
            <CategoriesBadge categoryName="Mais" icon={GiHamburgerMenu} />
          </HStack> */}

          <Flex>
            <VStack spacing="3" mr="2rem">
              {filters.length > 0 && (
                <VStack spacing="3" alignItems="left">
                  <Text>Filtros selecionados:</Text>

                  {filters.map((filter, index) => (
                    <FilterBadge key={filter.value} filterParams={filter} onRemove={() => onRemoveFilter(index)}/>
                  ))}
                </VStack>
              )}

              <Text textAlign="center">Filtre pela localização:</Text>

              <Select
                placeholder="Estado"
                bgColor="white"
                value={selectedState}
                onChange={(e) => onStateChange(e.target.value)}
              >
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </Select>

              <Select
                placeholder="Cidade"
                bgColor="white"
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value)}
              >
                {filteredCities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </Select>

              <Button
                bgColor="secondary"
                color="white"
                onClick={() => handleFilter()}
              >
                Filtrar
              </Button>
            </VStack>

            <Flex direction="column" w="100%" alignItems="center">
              {books.length > 0 ? (
                <Grid templateColumns="1fr 1fr 1fr" gap="1.5rem" mb="8">
                  {books.map((book) => (
                    <BookListItem key={book.id} book={book} />
                  ))}
                </Grid>
              ) : (
                <Text fontSize="lg" mt="8">
                  
                  {`Nenhum livro encontrado ${filters.length ? "para os filtros selecionados" : ""} ☹`} 
                </Text>
              )}

              {/* <Flex justifyContent="center" mb="6">
                <HStack fontSize="lg" spacing="3rem">
                  <Flex cursor="pointer">
                    <Icon as={IoIosArrowBack} boxSize={7} mr="10px" />
                    <Text>Anterior</Text>
                  </Flex>

                  <Flex>1 de 20</Flex>

                  <Flex cursor="pointer">
                    <Text>Próximo</Text>
                    <Icon as={IoIosArrowForward} boxSize={7} ml="10px" />
                  </Flex>
                </HStack>
              </Flex> */}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  if (query.busca && typeof query.busca === "string") {
    const response = await getFilteredBooks({
      bookName: query.busca as string,
    });
    const books = response.data;

    return {
      props: {
        books,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
