export default function useFatch(url: string) {
  const getFatch = async (paramsorqery: string) => {
    try {
      const res = await fetch(`${url}${paramsorqery}`, {
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`error from user  ${errorData.error.message}`);
      }
      const response = await res.json();

      return response;
    } catch (error) {
      console.error("cant to do it", error);
    }
  };

  return { getFatch };
}
