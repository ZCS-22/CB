/* ============================================================
   Chennai Beats — animation & 3D behavior
   - Scroll-reveal (IntersectionObserver, staggered)
   - 3D tilt cards with cursor-tracking shine
   - Header shadow on scroll
   - Three.js particle field in the hero
   All effects skip when prefers-reduced-motion is set.
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header shadow ---------- */
  var header = document.querySelector(".site-header");
  window.addEventListener("scroll", function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });

  if (reduce) return; // everything below is motion

  /* ---------- Scroll reveal with stagger ---------- */
  var revealSelectors = ".section-head, .card, .img-fallback, .step, .costume-band, .checklist li, .location-card";
  document.querySelectorAll(revealSelectors).forEach(function (el) {
    el.classList.add("reveal");
    var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty("--d", (idx % 6) * 0.09 + "s");
  });

  // hero entrance stagger
  [".hero .eyebrow", ".hero h1", ".hero .lead", ".hero .hero-ctas", ".hero .hero-visual"]
    .forEach(function (sel, i) {
      var el = document.querySelector(sel);
      if (el) { el.classList.add("reveal"); el.style.setProperty("--d", i * 0.12 + "s"); }
    });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---------- 3D tilt cards (desktop pointers only) ---------- */
  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".card, .img-fallback").forEach(function (c) {
      c.classList.add("tilt");
      c.addEventListener("mousemove", function (ev) {
        var r = c.getBoundingClientRect();
        var x = (ev.clientX - r.left) / r.width;
        var y = (ev.clientY - r.top) / r.height;
        c.style.transform =
          "perspective(900px) rotateX(" + ((0.5 - y) * 8).toFixed(2) + "deg)" +
          " rotateY(" + ((x - 0.5) * 10).toFixed(2) + "deg) translateY(-4px)";
        c.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        c.style.setProperty("--my", (y * 100).toFixed(1) + "%");
      });
      c.addEventListener("mouseleave", function () { c.style.transform = ""; });
    });
  }

  /* ---------- Three.js particle field in hero ---------- */
  var canvas = document.getElementById("hero3d");
  if (canvas && window.THREE) {
    try { initHero3D(canvas); } catch (e) { canvas.style.display = "none"; }
  }

  function initHero3D(canvas) {
    var hero = canvas.parentElement;
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 8;

    // particle cloud in brand colors: gold, maroon, cream
    var N = 650;
    var pos = new Float32Array(N * 3);
    var col = new Float32Array(N * 3);
    var palette = [
      [0.75, 0.54, 0.18], // gold
      [0.56, 0.16, 0.21], // maroon
      [0.91, 0.84, 0.71]  // cream
    ];
    for (var i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      var c = palette[(Math.random() * palette.length) | 0];
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    var mat = new THREE.PointsMaterial({
      size: 0.075, vertexColors: true, transparent: true,
      opacity: 0.8, depthWrite: false
    });
    var points = new THREE.Points(geo, mat);
    scene.add(points);

    // a second, sparser ring of larger "spotlight" particles
    var N2 = 60;
    var pos2 = new Float32Array(N2 * 3);
    for (var j = 0; j < N2; j++) {
      var a = Math.random() * Math.PI * 2, rad = 5 + Math.random() * 4;
      pos2[j * 3] = Math.cos(a) * rad;
      pos2[j * 3 + 1] = (Math.random() - 0.5) * 6;
      pos2[j * 3 + 2] = Math.sin(a) * rad;
    }
    var geo2 = new THREE.BufferGeometry();
    geo2.setAttribute("position", new THREE.BufferAttribute(pos2, 3));
    var mat2 = new THREE.PointsMaterial({
      size: 0.16, color: 0xC08A2D, transparent: true,
      opacity: 0.5, depthWrite: false
    });
    var ring = new THREE.Points(geo2, mat2);
    scene.add(ring);

    // mouse parallax
    var mx = 0, my = 0;
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
    });

    function size() {
      var w = hero.clientWidth, h = hero.clientHeight;
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    size();
    window.addEventListener("resize", size);

    var t = 0;
    (function loop() {
      requestAnimationFrame(loop);
      t += 0.0022;
      points.rotation.y = t + mx * 0.35;
      points.rotation.x = Math.sin(t * 0.7) * 0.08 + my * 0.22;
      ring.rotation.y = -t * 1.4;
      renderer.render(scene, camera);
    })();
  }
})();
