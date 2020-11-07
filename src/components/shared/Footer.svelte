<script>
  import { getAppVersion } from "./shared";
</script>

<!-- Styles -->
<style>
  p {
    position: fixed;
    left: 0;
    bottom: 0;
    text-align: right;
    background-color: #ddd;
    padding: 0.5em;
    margin: 0;
    font-size: 80%;
    font-style: italic;
  }
</style>

<p>version {getAppVersion()}</p>
