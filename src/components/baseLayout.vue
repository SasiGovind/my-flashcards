
<template #footer>
    <div>
        <p>
            <strong>
                <span style="float:left">Nous contacter</span>
            </strong>
            <br><br>
            <strong>
                <span style="float:left">Notre équipe</span>
                <span style="float:right">Date: {{date}}</span>
            </strong>
            <br><br>
            <strong>
                <span style="float:left">Confidentialité</span>
                <span style="float:right">Langue sélectionnée:</span>
            </strong>
            <select v-model="langues" style="background:white; float:right">
                <option disabled value="">Choisir</option>
                <option>Français</option>
                <option>Anglais</option>
            </select>
        </p>
    </div>
</template>
<!--</baseLayout>-->

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