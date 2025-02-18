import { baseURL } from "@/lib/baseURL";
import { Joke } from "@/types/data.types";

// Fetch a joke
export async function getJokes() {
  try {
    const response = await fetch(`${baseURL}/api/joke`, { method: "GET" });

    //Check if the response is successful
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    //   console.log("Jokes fetched:", data);

    return data;
  } catch (error) {
    console.error("Error fetching jokes:", error);
    return {
      jokes: [],
      error: "Failed to fetch jokes. Please try again later.",
    };
  }
}

//Vote mutation, id is the joke id, label is the emoji
export async function Vote(id: string, label: string) {
  try {
    const response = await fetch(`${baseURL}/api/joke/${id}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ label }), // Correctly sending an object as JSON
    });

    //Check if the response is successful
    if (!response.ok) {
      throw new Error(
        `Failed to vote: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Vote response:", data);

    return data;
  } catch (error: any) {
    console.error("Error voting:", error);
    return { success: false, error: error.message };
  }
}

// Update joke mutation, id is the joke id, updatedJoke is the updated joke
export async function updateJoke(id: string, updatedJoke: Partial<Joke>) {
  try {
    const response = await fetch(`${baseURL}/api/joke/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updatedJoke), // Send the updated question and answer
    });

    //Check if the response is successful
    if (!response.ok) {
      throw new Error(
        `Failed to update joke: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Update response:", data);

    return data;
  } catch (error: any) {
    console.error("Error updating joke:", error);
    return { success: false, error: error.message };
  }
}

// Delete Joke mutation
export async function deleteJoke(id: string) {
  try {
    const response = await fetch(`${baseURL}/api/joke/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    //Check if the response is successful
    if (!response.ok) {
      throw new Error(
        `Failed to delete joke: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Delete response:", data);

    return data;
  } catch (error: any) {
    console.error("Error deleting joke:", error);
    return { success: false, error: error.message };
  }
}
