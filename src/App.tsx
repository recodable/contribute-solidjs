import type { Component } from "solid-js";
import { createResource } from "solid-js";
import { For, Suspense } from "solid-js/web";

type Label = {
  color: string;
  name: string;
};

const App: Component = () => {
  const [issues] = createResource<any[]>(() =>
    fetch(import.meta.env.VITE_API_URL).then((res) => res.json())
  );

  return (
    <div class="min-h-screen min-w-screen bg-gray-900 text-white p-16 flex flex-col justify-center items-center">
      <div
        class="flex flex-col justify-center items-center gap-12"
        style="max-width: 768px;"
      >
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-6">
            Contribute to Solid.js ecosystem
          </h1>

          <p class="text-xl font-light text-gray-500">
            Find all issues that need your help in the Solid.js ecosystem
            <br />
            (official and community packages).
          </p>
        </div>

        <Suspense
          fallback={
            <div>
              <svg
                class="animate-spin h-10 w-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          }
        >
          <ul class="flex flex-col gap-6">
            <For each={issues()}>
              {(issue) => (
                <li>
                  <a
                    href={issue.html_url}
                    class="flex justify-between items-center bg-gray-700 p-8"
                    target="_blank"
                  >
                    <div>
                      <span class="bg-blue-500 text-blue-900 px-1 py-0.5 text-sm rounded-sm">
                        {issue.repo.owner}/{issue.repo.name}
                      </span>

                      <h3 class="text-2xl font-semibold flex items-baseline gap-2">
                        <svg
                          width="16"
                          height="16"
                          aria-label="Issue"
                          viewBox="0 0 16 16"
                          version="1.1"
                          class="flex-shrink-0"
                          style="fill: currentColor; color: #56d364"
                        >
                          <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                          <path
                            fill-rule="evenodd"
                            d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
                          ></path>
                        </svg>

                        <span>{issue.title}</span>
                      </h3>

                      <ul class="mt-4 flex gap-4">
                        <For each={issue.labels}>
                          {(label: Label) => (
                            <li
                              class="text-xs rounded p-0.5"
                              style={`background-color: #${label.color};`}
                            >
                              {label.name}
                            </li>
                          )}
                        </For>
                      </ul>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </li>
              )}
            </For>
          </ul>
        </Suspense>

        <footer>
          <p class="text-gray-600">
            This project is{" "}
            <a
              href="https://github.com/recodable/contribute-solidjs"
              target="_blank"
              class="text-blue-700 hover:text-blue-600 underline"
            >
              open-source
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
