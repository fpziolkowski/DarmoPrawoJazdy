# DarmoPrawoJazdy

> Prosta, lekka i całkowicie darmowa platforma internetowa do nauki na prawo jazdy (kategorie A, A1, A2, AM, B, B1, C, C1, D, D1, T).
> **Aplikacja w 100% przeglądarkowa – działa natychmiastowo na telefonie i komputerze, bez konieczności pobierania i instalacji.**

[![Demo Online](https://img.shields.io/badge/🌐_Zobacz_Demo-darmoprawojazdy.pages.dev-0070f3?style=for-the-badge)](https://darmoprawojazdy.pages.dev/)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![HTML5](https://img.shields.io/badge/Frontend-HTML5%20%2F%20CSS3%20%2F%20JS-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![License](https://img.shields.io/badge/License-GPL--3.0-blue?style=for-the-badge)

👉 **Aplikacja jest dostępna pod adresem:** [https://darmoprawojazdy.pages.dev/](https://darmoprawojazdy.pages.dev/)

---

## 📢 Aktualności i ważne komunikaty

> [!IMPORTANT]
> **Ostatnia weryfikacja bazy pytań:** `05.08.2026` 🟢  
> Aby upewnić się, czy baza jest aktualna, odwiedź stronę [Ministerstwa Infrastruktury (gov.pl)](https://www.gov.pl/web/infrastruktura/prawo-jazdy).

---

## 📌 O projekcie

DarmoPrawoJazdy to open-source'owa, całkowicie darmowa i pozbawiona reklam alternatywa dla komercyjnych portali oraz płatnych aplikacji z testami na prawo jazdy.

Aplikacja nie zawiera wbudowanych wyjaśnień, ponieważ nie są one częścią oficjalnej bazy ministerialnej. W przypadku niezrozumiałych pytań zaleca się wykonanie zrzutu ekranu lub skopiowanie treści do modeli AI (np. Gemini czy ChatGPT) w celu uzyskania wytłumaczenia przepisów.

### 💡 Główne funkcje:
* **Dostęp w przeglądarce:** Zero instalowania, natychmiastowe uruchomienie na smartfonie, tablecie czy komputerze.
* **Pełna responsywność (RWD):** Interfejs zaprojektowany z myślą o urządzeniach mobilnych i desktopowych (Mobile-First), zapewniający wygodną obsługę na każdym ekranie.
* **Tryb nauki (`test-all.html`):** Przeglądanie całej bazy pytań po numerach.
* **Tryb egzaminu (`test-exam.html`):** Symulacja państwowego egzaminu (zestaw 32 pytań z kompozycją i punktacją ściśle zgodną z egzaminem państwowym).
* **Wybór kategorii:** Obsługa wszystkich kategorii prawa jazdy z zapamiętywaniem preferencji w `localStorage`.
* **Zero reklam i opłat:** Natychmiastowe ładowanie bez skryptów śledzących i ciężkich frameworków.

---

## 🛠️ Architektura i stos technologiczny

* **Baza pytań:** Oficjalna baza `.xlsx` udostępniana przez Ministerstwo Infrastruktury została przekonwertowana do formatu JSON i osadzona bezpośrednio w pliku `questions_db.js`.
* **Hosting multimediów:** Pliki wideo (`.wmv` / `.mp4`) oraz zdjęcia sytuacyjne przypisane do pytań są hostowane w pamięci masowej **Cloudflare R2 Storage**.

| Element | Technologia / Serwis |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (RWD / Flexbox / Grid), JavaScript (Vanilla JS) |
| **Baza danych pytań** | Stała `allQuestions` w `questions_db.js` |
| **Hosting aplikacji** | Cloudflare Pages |
| **Storage multimediów** | Cloudflare R2 Storage |
| **Obsługa kategorii** | `localStorage` przeglądarki |

---

## ☕ Wsparcie projektu

Jeśli projekt Ci się podoba i pomógł Ci w przygotowaniach do egzaminu, możesz postawić mi symboliczną kawę:  
👉 **[buycoffee.to/fpziolkowski](https://buycoffee.to/fpziolkowski)**

---

## 📄 Licencja

Projekt objęty jest licencją **GNU General Public License v3.0 (GPLv3)**. Szczegóły znajdziesz w pliku [LICENSE](LICENSE).

*Pytania egzaminacyjne oraz materiały multimedialne stanowią informację publiczną (źródło: [gov.pl](https://www.gov.pl/web/infrastruktura/prawo-jazdy)).*
