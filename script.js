const eventsStore = [
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    description: "Being an INFJ",
    date: new Date(2024, 2, 23, 15),
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w",
    type: "offline",
    attendees: 99,
    category: "Hobbies and Passions",
    distance: 50,
  },
  {
    title:
      "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
    description: "New York AI Users",
    date: new Date(2024, 2, 23, 11, 30),
    image:
      "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    attendees: 43,
    category: "Technology",
    distance: 25,
  },
  {
    title: "Book 40+ Appointments Per Month Using AI and Automation",
    description: "New Jersey Business Network",
    date: new Date(2024, 2, 16, 14),
    image:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    category: "Technology",
    distance: 10,
  },
  {
    title: "Dump writing group weekly meetup",
    description: "Dump writing group",
    date: new Date(2024, 2, 13, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 77,
    category: "Business",
    distance: 100,
  },
  {
    title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
    description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 140,
    category: "Social Activities",
    distance: 75,
  },
  {
    title: "All Nations - Manhattan Missions Church Bible Study",
    description: "Manhattan Bible Study Meetup Group",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    category: "Health and Wellbeing",
    distance: 15,
  },
];

const isJoinPage = document.querySelector(".see-all-events");
const isEventsPage = document.querySelector(".events-left");

// сохраняем данные в локальное хранилище и сразу переходим на вторую страницу
if (isJoinPage) {
  document.querySelector(".see-all-events").addEventListener("click", () => {
    localStorage.setItem("eventsData", JSON.stringify(eventsStore));
    window.location.href = "http://127.0.0.1:5500/index_2.html";
  });
}

// рэндэрим элементы на страницу
const renderEvents = (events) => {
  const containerContent = document.querySelector(".container-content");
  containerContent.innerHTML = "";

  events.forEach((event) => {
    const eventHTML = `
      <div class="render-content">
        <img src="${event.image}" alt="${event.title}" />
        <div class="content-text">
          <span>${event.date.toDateString()}</span>
          <h4>${event.title}</h4>
          <p>${event.category} (${event.distance} km)</p>
          <p>Attendees: ${event.attendees || 0}</p>
        </div>
      </div>
    `;
    containerContent.innerHTML += eventHTML;
  });
};

// получаем данные из локального хранилища и сразу вызываем функцию renderEvents()
if (isEventsPage) {
  const eventsData = JSON.parse(localStorage.getItem("eventsData")) || [];

  // преобразуем строки в объеке Date
  eventsData.forEach((event) => {
    event.date = new Date(event.date);
  });
  renderEvents(eventsData);

  // задаем текущие значения фильтров
  let filters = {
    type: "any",
    distance: null,
    category: "any",
    date: null,
  };

  // фильтруем массив событий (eventsData)
  const filterEvents = () => {
    const filteredEvents = eventsData.filter((event) => {
      if (filters.type !== "any" && event.type !== filters.type) return false;
      if (filters.distance !== null && event.distance > filters.distance)
        return false;
      if (filters.category !== "any" && event.category !== filters.category)
        return false;
      if (
        filters.date &&
        event.date.toDateString() !== new Date(filters.date).toDateString()
      )
        return false;
      return true;
    });
    // вызываем для отображение фильтрованных событий
    renderEvents(filteredEvents);
  };

  // логика обработки фильтров, для выбора параметров фильтрации через элементы интерфейса
  document.querySelectorAll("ul li[data-filter]").forEach((filterButton) => {
    filterButton.addEventListener("click", (e) => {
      const filterType = e.target.closest("li[data-filter]").dataset.filter;
      const dropdown = document.getElementById(`${filterType}-dropdown`);

      // Скрываем все другие шторки фильтров
      document.querySelectorAll(".filter-dropdown").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
      dropdown.classList.add("active");

      // определяем поле ввода и получаем введенные значения
      let userInput;
      switch (filterType) {
        case "type":
          userInput = document.getElementById("type").value;
          break;
        case "distance":
          userInput = document.getElementById("distance").value;
          break;
        case "category":
          userInput = document.getElementById("category").value;
          break;
        case "date":
          userInput = document.getElementById("date").value;
          break;
      }
      // Обновляем фильтры по мере изменений
      const updateFilter = () => {
        if (userInput) {
          // преобразование строки в десятичное значение(parseInt(userInput,10))
          filters[filterType] =
            filterType === "distance" ? parseInt(userInput, 10) : userInput;
          // Применяем фильтрацию для обновления отображений
          filterEvents();
        }
      };

      // обработчики событий для ввода
      const filterElements = dropdown.querySelectorAll("input,select");
      filterElements.forEach((element) => {
        element.addEventListener("change", (event) => {
          userInput = event.target.value;
          updateFilter();
        });
      });
    });
  });
}

// разные активные кнопки интерфеса
const mapElement = document.querySelector(".map");
const meetUp = document.querySelector(".meet-up");
const eventsLink = document.querySelector(".events-link");

if (mapElement) {
  mapElement.addEventListener("click", () => {
    window.location.href =
      "https://www.google.com/maps/place/Edge+NYC/@40.7323357,-74.0257665,12.74z/data=!3m1!5s0x89c259b40f09b0eb:0xcb2673120c1dd547!4m14!1m7!3m6!1s0x89c259a24009bf35:0x435fc7aa4b28fc51!2sParagon+Sports!8m2!3d40.7377091!4d-73.9904174!16s%2Fg%2F1tfl13km!3m5!1s0x89c2590de5aaaadd:0xcc6b2b13b4bd86f!8m2!3d40.7533936!4d-74.001055!16s%2Fg%2F11j38vkhjk?authuser=0&entry=ttu&g_ep=EgoyMDI0MTIwOS4wIKXMDSoASAFQAw%3D%3D";
  });
}
if (meetUp) {
  meetUp.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/index.html";
  });
}

if (eventsLink) {
  eventsLink.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/index_2.html";
  });
}
