(function()
{
	function h()
	{
		u.ribbon = document.querySelector(".forkit");
		u.curtain = document.querySelector(".forkit-curtain");
		u.closeButton = document.querySelector(".forkit-curtain .close-button");
		if (u.ribbon)
		{
			f = u.ribbon.getAttribute("data-text") || "";
			l = u.ribbon.getAttribute("data-text-detached") || f;
			u.ribbon.innerHTML = '<span class="string"></span><span class="tag">' + f + "</span>";
			u.ribbonString = u.ribbon.querySelector(".string");
			u.ribbonTag = u.ribbon.querySelector(".tag");
			u.ribbon.addEventListener("click", b, false);
			document.addEventListener("mousemove", d, false);
			document.addEventListener("mousedown", p, false);
			document.addEventListener("mouseup", v, false);
			document.addEventListener("touchstart", m, false);
			document.addEventListener("touchmove", g, false);
			document.addEventListener("touchend", y, false);
			window.addEventListener("resize", E, false);
			if (u.closeButton)
			{
				u.closeButton.addEventListener("click", w, false)
			}
			N()
		}
	}
	function p(e)
	{
		if (e.srcElement.className == "tag")
		{
			if (u.curtain && a === t)
			{
				e.preventDefault();
				dragY = e.clientY;
				dragTime = Date.now();
				dragging = true
			}
		} else
		{

		}
	}
	function d(e)
	{
		mouse.x = e.clientX;
		mouse.y = e.clientY
	}
	function v(t)
	{
		if (a !== n)
		{
			a = e;
			dragging = false
		}
	}
	function m(e)
	{
		if (u.curtain && a === t)
		{
			e.preventDefault();
			var n = e.touches[0];
			dragY = n.clientY;
			dragTime = Date.now();
			dragging = true
		}
	}
	function g(e)
	{
		var t = e.touches[0];
		mouse.x = t.pageX;
		mouse.y = t.pageY
	}
	function y(t)
	{
		if (a !== n)
		{
			a = e;
			dragging = false
		}
	}
	function b(e)
	{
		if (u.curtain)
		{
			e.preventDefault();
			if (a === n)
			{
				x()
			} else if (Date.now() - dragTime < 300)
			{
				S()
			}
		}
	}
	function w(e)
	{
		e.preventDefault();
		x()
	}
	function E()
	{
		if (a === n)
		{
			curtainTargetY = window.innerHeight;
			curtainCurrentY = curtainTargetY
		}
	}
	function S()
	{
		dragging = false;
		a = n;
		M("forkit-open")
	}
	function x()
	{
		dragging = false;
		a = e;
		u.ribbonTag.innerHTML = f;
		M("forkit-close")
	}
	function T()
	{
		a = t;
		u.ribbonTag.innerHTML = l
	}
	function N()
	{
		C();
		k();
		requestAnimFrame(N)
	}
	function C()
	{
		var e = O(mouse.x, mouse.y, window.innerWidth, 0);
		if (a === n)
		{
			curtainTargetY = Math.min(curtainTargetY + (window.innerHeight - curtainTargetY) * .2, window.innerHeight)
		} else
		{
			if (e < i * 1.5)
			{
				T()
			} else if (!dragging && a === t && e > i * 2)
			{
				x()
			}
			if (dragging)
			{
				curtainTargetY = Math.max(mouse.y - dragY, 0);
				if (curtainTargetY > window.innerHeight * o)
				{
					S()
				}
			} else
			{
				curtainTargetY *= .8
			}
		}
		curtainCurrentY += (curtainTargetY - curtainCurrentY) * .3;
		if (dragging || a === t)
		{
			velocity /= c;
			velocity += gravity;
			var r = u.ribbon.offsetLeft;
			var f = Math.max((mouse.x - r - closedX) * .2, -s);
			anchorB.x += (closedX + f - anchorB.x) * .1;
			anchorB.y += velocity;
			var l = O(anchorA.x, anchorA.y, anchorB.x, anchorB.y);
			if (l > s)
			{
				velocity -= Math.abs(l) / (s * 1.25)
			}
			var h = Math.max(mouse.y - anchorB.y, 0), p = mouse.x - (r + anchorB.x);
			var d = Math.min(130, Math.max(50, Math.atan2(h, p) * 180 / Math.PI));
			rotation += (d - rotation) * .1
		} else if (a === n)
		{
			anchorB.x += (openedX - anchorB.x) * .2;
			anchorB.y += (openedY - anchorB.y) * .2;
			rotation += (90 - rotation) * .02
		} else
		{
			anchorB.x += (anchorA.x - anchorB.x) * .2;
			anchorB.y += (anchorA.y - anchorB.y) * .2;
			rotation += (45 - rotation) * .2
		}
	}
	function k()
	{
		if (u.curtain)
		{
			u.curtain.style.top = -100 + Math.min(curtainCurrentY / window.innerHeight * 100, 100) + "%"
		}
		u.ribbon.style[L("transform")] = A(0, curtainCurrentY, 0);
		u.ribbonTag.style[L("transform")] = A(anchorB.x, anchorB.y, rotation);
		var e = anchorB.y - anchorA.y, t = anchorB.x - anchorA.x;
		var n = Math.atan2(e, t) * 180 / Math.PI;
		u.ribbonString.style.width = anchorB.y + "px";
		u.ribbonString.style[L("transform")] = A(anchorA.x, 0, n)
	}
	function L(e, t)
	{
		var n = e.slice(0, 1).toUpperCase() + e.slice(1);
		for ( var r = 0, i = VENDORS.length; r < i; r++)
		{
			var s = VENDORS[r];
			if (typeof (t || document.body).style[s + n] !== "undefined")
			{
				return s + n
			}
		}
		return e
	}
	function A(e, t, n)
	{
		return "translate(" + e + "px," + t + "px) rotate(" + n + "deg)"
	}
	function O(e, t, n, r)
	{
		var i = e - n;
		var s = t - r;
		return Math.sqrt(i * i + s * s)
	}
	function M(e)
	{
		var t = document.createEvent("HTMLEvents", 1, 2);
		t.initEvent(e, true, true);
		u.ribbon.dispatchEvent(t)
	}
	function _(e, t)
	{
		this.x = e || 0;
		this.y = t || 0
	}
	var e = 0, t = 1, n = 2, r = 30, i = 200, s = 40, o = .36;
	VENDORS = [ "Webkit", "Moz", "O", "ms" ];
	var u = {
		ribbon : null,
		ribbonString : null,
		ribbonTag : null,
		curtain : null,
		closeButton : null
	}, a = e, f = "", l = "", c = 1.04;
	gravity = 1.5, closedX = i * .4, closedY = -r * .5, openedX = i * .4, openedY = r, velocity = 0, rotation = 45, curtainTargetY = 0, curtainCurrentY = 0, dragging = false, dragTime = 0, dragY = 0, anchorA = new _(closedX, closedY), anchorB = new _(closedX, closedY), mouse = new _;
	_.prototype.distanceTo = function(e, t)
	{
		var n = e - this.x;
		var r = t - this.y;
		return Math.sqrt(n * n + r * r)
	};
	_.prototype.clone = function()
	{
		return new _(this.x, this.y)
	};
	_.prototype.interpolate = function(e, t, n)
	{
		this.x += (e - this.x) * n;
		this.y += (t - this.y) * n
	};
	window.requestAnimFrame = function()
	{
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e)
		{
			window.setTimeout(e, 1e3 / 60)
		}
	}();
	h()
})()
