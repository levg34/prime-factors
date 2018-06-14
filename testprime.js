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

const MULT = '&times'

function test() {
	var nb = document.getElementById('nb').value
	var res = ''
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