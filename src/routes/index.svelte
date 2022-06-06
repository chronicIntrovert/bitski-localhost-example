<script lang="ts">
  import { ethers } from 'ethers';
  import { onMount } from 'svelte';

  let bitski;
  let authenticated = false;

  const login = async () => {
    try {
      const user = await bitski.signIn();
      if (user) {
        authenticated = true;
      }
    } catch (err) {
      console.error('Error logging in', err);
    }
  }

  const logout = async () => {
    try {
      await bitski.signOut();
    } catch (err) {
      console.error('Error logging in', err);
    }
  }

  onMount(async () => {
    const  { Bitski } = await import('bitski');

    bitski = new Bitski(
      "10dc9543-80fe-4376-9447-8290c4650b6a",
      "http://localhost:3000/callback.html"
    );

    const bitskiProvider = bitski.getProvider();
  });
</script>

{#if authenticated}
  <p>You are logged in.</p>
{:else}
  <p>You are not logged in.</p>
  <button on:click={login}>Log In</button>
{/if}
