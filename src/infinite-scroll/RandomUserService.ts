import type { User } from "@/infinite-scroll/User";

export function getRandomUsers(x: number = 10) {
  return new Promise<User[]>((resolve, reject) => {
    setTimeout(() => {
      fetch(`https://randomuser.me/api?results=${x}&noinfo`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw response.json();
          }
        })
        .then((data: { results: User[] }) => {
          resolve(data.results);
        })
        .catch((e) => reject(e));
    }, 1000);
  });
}
