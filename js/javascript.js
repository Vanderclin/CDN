/*
 * visitor.js | http://www.visitorjs.com/
 * Copyright © 2011-2019 Wulfsoft.
 * This product includes GeoLite data created by MaxMind, available from http://maxmind.com/.
 */
var visitor = visitor || function () {
    var f;

    function q(g) {
        for (var c = "fullUrl,scheme,authority,userInfo,user,pass,host,port,relative,path,directory,file,query,fragment".split(","), g = /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(g), d = {}, a = 14; a--;) d[c[a]] = g[a] || "";
        return d
    }

    function t(g) {
        for (var c = [["Google", "(?:images.)?google.(?:com|[a-z]{2}|com?.[a-z]{2})", "q"], ["Bing", "bing.com", "q"], ["Yahoo", "(?:.+.)?search.yahoo.(?:com|[a-z]{2}|com?.[a-z]{2})",
"p"], ["AOL", "(?:aol)?search.aol.(?:com|[a-z]{2}|com?.[a-z]{2})", "q"], ["Ask", "(?:[a-z]+.)?ask.com", "q"], ["Lycos", "(?:(?:search|buscador).)?lycos.(?:com|[a-z]{2}|com?.[a-z]{2})", "query"], ["Baidu", "baidu.com", "wd"], ["Yandex", "yandex.(?:com|ru)", "text"]], d = "", a = "", b = [], h = 0; h < c.length; h++) {
            var u = RegExp("^https?://(?:www.)?" + c[h][1] + "/.*[?&]" + c[h][2] + "=([^&]+)").exec(g);
            if (u) {
                d = c[h][0];
                a = m(u[1]).replace(/\++/g, " ").trim();
                g = /([^\s"\']+)|"([^"]*)"/g;
                for (c = i;
                    (c = g.exec(a.toLowerCase())) != i;) c = (c[1] || c[2]).trim(),
                    b.push(c);
                break
            }
        }
        return {
            engine: d,
            query: a,
            terms: b
        }
    }

    function w() {
        return {
            engine: {
                name: "Webkit",
                versionMajor: b("537", 10),
                versionMinor: b("36", 10)
            },
            name: "Chrome",
            versionMajor: b("84", 10),
            versionMinor: b("0",
                10),
            plugins: {
                flash: function () {
                    var g = !1,
                        c = [0, 0, 0],
                        d = n["Shockwave Flash"];
                    if (typeof n != "undefined" && typeof d == "object") {
                        var a = d.description,
                            d = k["application/x-shockwave-flash"];
                        a && !(typeof k != "undefined" && d && !d.enabledPlugin) && (g = !0, a = a.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), c[0] = b(a.replace(/^(.*)\..*$/, "$1"), 10), c[1] = b(a.replace(/^.*\.(.*)\s.*$/, "$1"), 10), c[2] = /[a-zA-Z]/.test(a) ? b(a.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0)
                    } else if (typeof j.ActiveXObject != "undefined") try {
                        var f = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                        if (f && (g = !0, a = f.GetVariable("$version"))) a = a.split(" ")[1].split(","), c = [b(a[0], 10), b(a[1], 10), b(a[2], 10)]
                    } catch (h) {}
                    return {
                        enabled: g,
                        versionMajor: c[0],
                        versionMinor: c[1],
                        versionRevision: c[2]
                    }
                }(),
                silverlight: function () {
                    var g = !1,
                        c = [0, 0],
                        d = n["Silverlight Plug-In"];
                    if (typeof n != "undefined" && typeof d == "object") {
                        var a = d.description,
                            d = k["application/x-silverlight"],
                            f = k["application/x-silverlight-2"];
                        if (a && !(typeof k != "undefined" && (d && !d.enabledPlugin || f && !f.enabledPlugin))) g = !0, a = a.match(/^(\d+)\.(\d+)/),
                            a.length >= 3 && (c[0] = b(a[1], 10), c[1] = b(a[2], 10))
                    } else if (typeof j.ActiveXObject != "undefined") try {
                        if (a = new ActiveXObject("AgControl.AgControl")) {
                            g = !0;
                            for (d = 1; d < 100; d++)
                                if (a.isVersionSupported(d + ".0")) c[0] = d;
                                else break;
                            if (c[0] > 0)
                                for (d = 0; d < 100; d++)
                                    if (a.isVersionSupported(c[0] + "." + d)) c[1] = d;
                                    else break
                        }
                    } catch (h) {}
                    return {
                        enabled: g,
                        versionMajor: c[0],
                        versionMinor: c[1]
                    }
                }(),
                java: {
                    enabled: r.javaEnabled()
                }
            }
        }
    }
    var o = document,
        r = navigator,
        k = r.mimeTypes,
        n = r.plugins,
        j = window,
        p = screen,
        s = encodeURIComponent,
        m = decodeURIComponent,
        b = parseInt,
        v = parseFloat,
        i = null;
    f = void 0;
    f = function () {
        function g(a, c, d, f, b, g) {
            var i;
            d && (i = new Date, i.setTime(i.getTime() + d));
            o.cookie = a + "=" + s(c) + (d ? ";expires=" + i.toGMTString() : "") + ";path=" + (f || "/") + (b ? ";domain=" + b : "") + (g ? ";secure" : "")
        }

        function c(a) {
            return (a = RegExp("(^|;)[ ]*" + a + "=([^;]*)").exec(o.cookie)) ? m(a[2]) : 0
        }

        function d(a, c, d) {
            return {
                entryPage: a.slice(0, b),
                entryTs: c,
                referralUrl: d.slice(0, b)
            }
        }

        function a(a, c, d) {
            return {
                visitCount: a,
                firstEntryTs: c,
                firstReferralUrl: d.slice(0, b)
            }
        }
        var f = o.location.protocol ===
            "https",
            b = 1024;
        return function () {
            var b;
            a: {
                var e = c("_vjs_ses");
                if (e && (e = e.split("|"), e.length >= 3)) {
                    b = d(m(e[0]), e[1], m(e[2]));
                    break a
                }
                b = i
            }
            a: {
                if (e = c("_vjs_id"))
                    if (e = e.split("|"), e.length >= 3) {
                        e = a(e[0], e[1], m(e[2]));
                        break a
                    } e = i
            }
            var h = Math.round((new Date).getTime() / 1E3);
            if (!e || !b) {
                b = "";
                try {
                    b = j.top.document.referrer
                } catch (k) {
                    if (j.parent) try {
                        b = j.parent.document.referrer
                    } catch (n) {
                        b = ""
                    }
                }
                if (b === "") b = o.referrer;
                b != "" && q(b).host == document.location.hostname && (b = "");
                e ? e.visitCount++ : e = a(1, h, b);
                g("_vjs_id", e.visitCount +
                    "|" + e.firstEntryTs + "|" + s(e.firstReferralUrl), 63072E6, i, i, f);
                var l = "";
                try {
                    l = j.top.document.location.href
                } catch (p) {
                    if (j.parent) try {
                        l = j.parent.document.location.href
                    } catch (r) {
                        l = ""
                    }
                }
                if (l === "") l = o.location.href;
                b = d(l, h, b)
            }
            h = b;
            g("_vjs_ses", s(h.entryPage) + "|" + h.entryTs + "|" + s(h.referralUrl), 18E5, i, i, f);
            return {
                visitor: e,
                session: b
            }
        }()
    }();
    return new Date(parseInt('1598832606', 10) * 1E3) >= new Date ? {
        ip: {
            address: "177.89.34.113"
        },
        geo: {
            continentCode: "SA",
            continentName: "South America",
            countryCode: "BR",
            countryName: "Brazil",
            city: "",
            postalCode: "",
            coordinates: {
                latitude: v("-23.5477"),
                longitude: v("-46.6358")
            }
        },
        locale: {
            languageCode: "pt",
            countryCode: "BR"
        },
        session: {
            entryPage: q(f.session.entryPage),
            sessionStart: new Date(f.session.entryTs * 1E3),
            referral: {
                url: q(f.session.referralUrl),
                search: t(f.session.referralUrl)
            },
            visitCount: f.visitor.visitCount
        },
        firstSession: {
            sessionStart: new Date(f.visitor.firstEntryTs * 1E3),
            referral: {
                url: q(f.visitor.firstReferralUrl),
                search: t(f.visitor.firstReferralUrl)
            }
        },
        browser: w(),
        os: {
            name: "Windows",
            version: "10"
        },
        device: {
            name: "",
            version: "",
            screen: {
                resolution: p.width + "x" + p.height,
                width: p.width,
                height: p.height
            }
        }
    } : null
}();
