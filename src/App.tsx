import type { Component } from "solid-js";
import { createResource } from "solid-js";
import { Show, For } from "solid-js/web";

type Label = {
  color: string;
  name: string;
};

const App: Component = () => {
  const [issues] = createResource<any[]>(() =>
    fetch(import.meta.env.VITE_API_URL).then((res) => res.json())
  );

  return (
    <div class="min-h-screen min-w-screen bg-gray-900 text-white p-16">
      <Show when={!issues.loading}>
        <ul class="mx-auto flex flex-col gap-6" style="max-width: 768px;">
          <For each={issues()}>
            {(issue) => (
              <li>
                <a
                  href={issue.html_url}
                  class="flex justify-between items-center bg-gray-700 p-8"
                  target="_blank"
                >
                  <div>
                    <span class="bg-blue-500 text-blue-700 px-1 text-sm rounded-sm">
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
                            class="text-xs"
                            style={`background-color: ${label.color}`}
                          >
                            {label.name}
                          </li>
                        )}
                      </For>
                    </ul>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
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

              // <li>
              //   <a href={issue.html_url} target="_blank">
              //     <h3 class="text-2xl font-semibold">{issue.title}</h3>

              //     <ul>
              //       <For each={issue.labels}>
              //         {(label: Label) => {
              //           return (
              //             <li style={`background-color: ${label.color}`}>
              //               {label.name}
              //             </li>
              //           );
              //         }}
              //       </For>
              //     </ul>
              //   </a>
              // </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};

export default App;
