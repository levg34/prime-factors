function isPrime(n) {
	if (n<2) return false
	return(generateTabPrime(n)[n])
}

function generateTabPrime(n) {
	if (n<2) return []
	var a = [false,false]
	for (var i=2;i<=n;++i) {
		a.push(true)
	}
	a.forEach(function(b,i) {
		if(b) {
			var j=2
			while(j*i<=n) {
				a[j*i]=false
				++j
			}
		}
	})
	return(a)
}

function allPrime(n) {
	var res = []
	var tab = generateTabPrime(n)
	tab.forEach(function(b,i) {
		if (b) {
			res.push(i)
		}
	})
	return res
}

function primeFactors(n) {
	var primes = allPrime(n)
	if (n<2||primes[n]) return {n:1}
	var res = {}
	var nb = n
	primes.slice().reverse().forEach(function(p) {
		while (Number.isInteger(nb/p)) {
			if (!res[p]) {
				res[p]=1
			} else {
				res[p]++
			}
			nb = nb/p
		}
	})
	return res
}

function symplifyRoot(n) {
	var res = {br:1,ar:1}
	var factors = primeFactors(n)
	for (var factor in factors) {
		if (factors.hasOwnProperty(factor)) {
			if (Number.isInteger(factors[factor]/2)) {
				res.br *= Math.pow(factor,factors[factor]/2)
			} else {
				res.br *= Math.pow(factor,(factors[factor]-1)/2)
				res.ar *= factor
			}
		}
	}
	return res
}

/* ------------------------ VISUAL PART --------------------------- */

const MULT = '&times;'
const RAC = '&radic;'
const MAX = Number(document.getElementById('nb').getAttribute('max'))
const MIN = Number(document.getElementById('nb').getAttribute('min'))

function displayPrimeFactors() {
	var nb = getNb()
	var res = nb + ' = '
	var factors = primeFactors(nb)
	for (var factor in factors) {
		if (factors.hasOwnProperty(factor)) {
			if (factors[factor]===1) {
				res += factor + MULT
			} else {
				res += factor + '<sup>' + factors[factor] + '</sup>' + MULT
			}
		}
	}
	document.getElementById('res').innerHTML = res.slice(0,-1*MULT.length)
}

function displaySimplifiedRoot() {
	var nb = getNb()
	var nbs = symplifyRoot(nb)
	if (nbs.br===1) {
		nbs.br = ''
	}
	document.getElementById('res').innerHTML = RAC + nb + ' = ' + nbs.br
	if (nbs.ar!==1) {
		document.getElementById('res').innerHTML += RAC + nbs.ar
	}
}

function getNb() {
	var nb = Number(document.getElementById('nb').value)
	if (nb < MIN) {
		nb = MIN
	} else if (nb > MAX) {
		nb = MAX
	}
	document.getElementById('nb').value = nb
	return nb
}
