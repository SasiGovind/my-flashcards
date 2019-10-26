<template>
<footer style="display:flex">
    <span>Mis en ligne le 07/10/2019</span>
    <a v-for="tag in tags" :href="tag.lien" style="color:white; text-decoration: none">
        {{ tag.libelle }}
    </a>
    <span>Langue sélectionnée:
        <select v-model="langues" style="color: black; font-weight: normal; background:white; appearance: menulist">
            <option disabled value=''>Choisir</option>
            <option>Français</option>
            <option>Anglais</option>
        </select>
    </span>
</footer>
</template>

<style>
footer {
  color: white;
  background:rgb(56, 122, 243);
  position: absolute;
  bottom: 0;
  padding: 15px;
  width: 100%;
  font-weight:bold;
  justify-content: space-around;
}
</style>

<script>
export default {
  data: function () {
    return {
      tags: [
        { lien: 'https://www.google.fr', libelle: 'Qui sommes nous?' },
        { lien: 'https://www.google.fr', libelle: 'Mentions légales' },
        { lien: 'https://www.google.fr', libelle: 'Contact' }
      ],
      langues: ''
    }
  }
}
</script>
