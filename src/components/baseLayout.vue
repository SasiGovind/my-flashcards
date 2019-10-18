<template #footer>
<footer>
    <strong>
        <span style="float:left">Nous contacter</span>
        <br><br>
        <span style="float:left">Notre équipe</span>
        <span style="float:right">Date: {{date}}</span>
    <br><br>
        <span style="float:left">Confidentialité</span>
        <span style="float:right">Langue sélectionnée: 
            <select v-model="langues" style="background:white">
                <option disabled value="">Choisir</option>
                <option>Français</option>
                <option>Anglais</option>
            </select>
        </span>
    </strong>
</footer>
</template>

<style>
footer {
  color: white;
  background:rgb(56, 122, 243);
  position: absolute;
  bottom: 0;
  padding: 30px;
  width: 100%
}
</style>

<script>
export default {
    data: function() {
        return {
            date: new Date().toLocaleString(),
            langues: []
        }
    }
}
</script>