import memjs from "memjs";

/**
 * Tests the connection to the Memcache server.
 * @param client The Memcache client instance.
 * @returns A promise that resolves with a success or failure message.
 */
// i have written this function just to test whether the memjs cli is able to connect to the server and 
// is not used anywhere
export async function testConnection(client: memjs.Client): Promise<void> {
  try {
    const testKey = "test_connection_key";
    const testValue = "connected";

    // Set a test value in Memcache
    await client.set(testKey, testValue, { expires: 10 });

    // Get the value back to verify connectivity
    const { value } = await client.get(testKey);

    if (value?.toString() === testValue) {
      console.log("Memcache is connected and working properly.");
    } else {
      console.log("Memcache connection test failed.");
    }
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error("Error connecting to Memcache:", error.message);
    else console.log("unknown error", error);
  }
}
