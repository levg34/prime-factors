package test;

import java.util.HashMap;
import java.util.Map;

public class Test {
	public static void main(String[] args) {
		long a = 304250263527210L;
		
		for (int i=2;i<=150;++i) {
			printFactors(i);
		}
		
		printFactors(a);
	}

	private static void printFactors(long a) {
		Map<Long, Integer> factors = primeFactors(a);
		String factorString = "";
		
		for (long n:factors.keySet()) {
			if (factors.get(n)==1){
				factorString += n+"*";
			} else {
				factorString += n+"^"+factors.get(n)+"*";
			}
		}
		
		System.out.println("N = "+a+" = "+factorString.substring(0, factorString.length()-1));
	}

	private static Map<Long,Integer> primeFactors(final long a) {
		Map<Long, Integer> pf = new HashMap<Long,Integer>();
		long nx = a;
		long px = 2;
		
		while (!isPrime(nx)) {
			while(nx%px!=0) {
				px = nextPrime(px);
			}
			nx = nx/px;
			if (!pf.containsKey(px)) {
				pf.put(px, 0);
			}
			pf.put(px, pf.get(px)+1);
			px = 2;
		}
		
		if (isPrime(nx)&&nx!=1) {
			if (!pf.containsKey(nx)) {
				pf.put(nx, 0);
			}
			pf.put(nx, pf.get(nx)+1);
		}

		return pf;
	}

	private static long nextPrime(long px) {
		long res = px+1;
		while (!isPrime(res)) {
			res += 1;
		}
		return res;
	}

	//checks whether an int is prime or not.
	private static boolean isPrime(long nx) {
	    //check if n is a multiple of 2
		if (nx%2==0) return false;
	    //if not, then just check the odds
	    for(int i=3;i*i<=nx;i+=2) {
	        if(nx%i==0)
	            return false;
	    }
	    return true;
	}
}
