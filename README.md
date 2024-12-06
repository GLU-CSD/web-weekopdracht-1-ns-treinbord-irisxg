[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/BMc2zizH)

Script voor Weergave van Vertrektijden
Dit script toont automatisch vertrektijden van treinen. Hieronder vind je instructies om de functionaliteit aan te passen, zoals de tijd tussen updates, de datum, en het tijdstip voor de API-aanroep.

Aanpassingen en Instellingen
1. Interval tussen vertrektijden
Het script ververst de vertrektijden automatisch na een ingestelde tijd.
Locatie in de code: Regel 68 in het JavaScript-bestand.
Standaardwaarde: 5000 milliseconden (5 seconden).

Aanpassen:
Verander 5000 naar het gewenste aantal milliseconden.

Bijvoorbeeld:
10000 = 10 seconden
2000 = 2 seconden.

2. Datum voor de API-aanroep
De API gebruikt een specifieke datum om resultaten op te halen.
Locatie in de code: Regel 32 in het script.
Standaardwaarde: 2024-12-05 (voorbeelddatum).
Aanpassen:
Verander 2024-12-05 naar de juiste datum in het formaat YYYY-MM-DD.
Voor bijvoorbeeld 6 december 2024, pas aan naar: 2024-12-06.

3. Tijdstip voor de API-aanroep
Het tijdstip wordt ook meegegeven aan de API om resultaten op te halen.
Locatie in de code: Regel 32 in het script, naast de datum.
Standaardwaarde: 22:00:00 (voorbeeldtijd).
Aanpassen:
Pas dit aan naar een tijdstip waarop treinen rijden, bijvoorbeeld: 08:00:00.
Tip: Als je geen resultaten krijgt, controleer de tijdinstellingen en vergelijk deze met een werkende tijd in de NS-app.

Suggesties voor Debugging
Controleer de NS-app om te zien of er treinen rijden op de ingestelde tijd en datum.
Experimenteer met de instellingen (datum/tijd) om resultaten te krijgen.

Opmerking
Deze instructies zijn bedoeld om eenvoudig wijzigingen aan te brengen in het script. Voor vragen of problemen kun je contact opnemen met Iris Govaard de ontwikkelaar.
