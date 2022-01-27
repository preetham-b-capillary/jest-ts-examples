  import axios from "axios";

  const swapiGetter = async (id: number) => {
    try {
      const result = await axios.get(`https://swapi.dev/api/people/${id}/`);
      return result.data.name;
    } catch (error) {
      return;
    }
  };

  export default swapiGetter;