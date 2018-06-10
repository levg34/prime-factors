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
