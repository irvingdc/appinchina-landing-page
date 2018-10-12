const pagesList = ["home", "aicon", "market", "about", "contact", "privacy-policy", "footer"];
var chartsCreated = !1,
    navDisplayed = !1,
    loading = !1;
(() => { let i = document.querySelector("#home .welcome-page");
    i ? i.style.height = (window.innerHeight - 170).toString() + "px" : null, document.querySelectorAll("form").forEach(m => { m.addEventListener("submit", n => { if (n.preventDefault(), "searchAiconForm" == n.target.id) { let o = find("#appToSearch").value;
                loading || "" == o || aiconSearch(o) } }, !1) }), loadExternalContent() })();

function loadExternalContent() { var i = document.createElement("script");
    i.type = "text/javascript", i.async = !0, i.src = "/js/external.js", document.getElementsByTagName("head")[0].appendChild(i) }

function hideMessage() { hide(find("p#confirmation")) }

function toggleNav() { navDisplayed ? hideNav() : showNav() }

function showNav() { navDisplayed = !0, find("nav + ul").classList.add("nav-displayed"), find(".open-nav-button").classList.add("nav-displayed"), show(find(".overlay")) }

function hideNav() { setTimeout(() => { navDisplayed = !1, find("nav + ul").classList.remove("nav-displayed"), find(".open-nav-button").classList.remove("nav-displayed"), hide(find(".overlay")) }, 10) }

function show(i) { i.classList.remove("hidden"), setTimeout(() => { i.classList.remove("invisible") }, 100) }

function hide(i) { i.classList.add("invisible"), setTimeout(() => { i.classList.add("hidden") }, 700) }

function sendForm(i) { let m = find("#" + i + " form"),
        n = m.querySelector("input[name='name']"),
        o = m.querySelector("input[name='email']"),
        p = m.querySelector("textarea") ? m.querySelector("textarea") : null,
        q = m.querySelector("input[name='phone']") ? m.querySelector("input[name='phone']") : null,
        r = find("p#confirmation"); var s = m.querySelector("button"),
        t = new XMLHttpRequest,
        u = new FormData; return u.append("name", n.value), u.append("email", o.value), u.append("message", p ? p.value : ""), u.append("phone", q ? q.value : ""), u.append("form", i), t.onreadystatechange = function() { if (4 == this.readyState && 200 == this.status) { loading = !1, s.innerHTML = "Submit"; let v = this.responseText; "success" == v ? (n.value = "", o.value = "", p ? p.value = "" : null, q ? q.value = "" : null, show(r), setTimeout(() => { hide(r) }, 2e4), handleFormSubmission(i)) : "test" == v && (n.value = "", o.value = "", p ? p.value = "" : null, q ? q.value = "" : null, show(r), setTimeout(() => { hide(r) }, 2e4)) } }, loading || (s.innerHTML = "<img src='/images/rolling.gif' style='height:80%;'/>", loading = !0, t.open("POST", "https://www.appinchina.co/inc/mail_general.php", !0), t.send(u)), !1 }

function find(i) { let m = document.querySelectorAll(i); return 1 < m.length ? m : m[0] }

function handleFormSubmission(i) { "conquerMarketForm" === i ? createIframe("https://www.appinchina.co?conf=2") : "marketForm" === i ? createIframe("https://www.appinchina.co?conf=4") : "aiconForm" === i ? createIframe("https://www.appinchina.co?conf=5") : "contactForm" === i ? createIframe("https://www.appinchina.co?conf=1") : void 0 }

function createIframe(i) { var m = document.createElement("iframe");
    m.style.display = "none", m.onload = () => { m.parentNode.removeChild(m) }, m.src = i, document.body.appendChild(m) }

function styleAsNumber(i) { var m = i.toString().split("."); return m[0] = m[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), m.join(".") }