// Fills the download panel from version.json, which the release script updates with each release.
(function () {
  var $ = function (id) { return document.getElementById(id); };
  $('year').textContent = new Date().getFullYear();
  fetch('version.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (v) {
      if (!v || !v.versionName) {
        $('download-btn').setAttribute('aria-disabled', 'true');
        $('download-btn').removeAttribute('href');
        $('notice').hidden = false;
        $('notice').textContent = 'The first release is being prepared. Check back shortly.';
        ['v-name', 'v-size', 'v-date', 'v-sha'].forEach(function (id) { $(id).textContent = '—'; });
        $('v-notes').textContent = 'No release yet.';
        return;
      }
      $('v-name').textContent = v.versionName;
      $('v-name-2').textContent = 'version ' + v.versionName;
      $('v-size').textContent = v.sizeBytes ? (v.sizeBytes / 1048576).toFixed(1) + ' MB' : '—';
      $('v-date').textContent = v.publishedAt ? new Date(v.publishedAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
      $('v-sha').textContent = v.sha256 || '—';
      $('v-notes').textContent = v.notes || 'Improvements and fixes.';
    })
    .catch(function () { $('v-name').textContent = 'latest'; });
})();
