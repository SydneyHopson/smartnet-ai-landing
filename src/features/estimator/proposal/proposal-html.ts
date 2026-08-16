import type { EstimatorProposalPackage } from "./proposal-package";

export function renderEstimatorProposalHtml(
  proposal: EstimatorProposalPackage
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>${escapeHtml(proposal.title)}</title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: #eef2f7;
      color: #172033;
      font-family:
        Arial,
        Helvetica,
        sans-serif;
      line-height: 1.5;
    }

    .page {
      width: min(1100px, calc(100% - 32px));
      margin: 32px auto;
      background: #ffffff;
      border: 1px solid #d9e1ea;
      box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
    }

    .header {
      padding: 42px 48px;
      color: #ffffff;
      background:
        linear-gradient(
          135deg,
          #071527,
          #123b5d
        );
    }

    .brand {
      margin: 0 0 12px;
      font-size: 16px;
      font-weight: 800;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      font-size: 38px;
      line-height: 1.12;
    }

    .subtitle {
      margin: 12px 0 0;
      color: #d6e8f5;
      font-size: 18px;
    }

    .meta {
      display: grid;
      grid-template-columns:
        repeat(3, minmax(0, 1fr));
      gap: 16px;
      padding: 24px 48px;
      background: #f8fafc;
      border-bottom: 1px solid #d9e1ea;
    }

    .meta-card {
      padding: 14px 16px;
      background: #ffffff;
      border: 1px solid #d9e1ea;
      border-radius: 10px;
    }

    .label {
      display: block;
      margin-bottom: 4px;
      color: #637083;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .value {
      font-size: 15px;
      font-weight: 700;
    }

    .content {
      padding: 40px 48px 56px;
    }

    section {
      margin-bottom: 38px;
      break-inside: avoid;
    }

    h2 {
      margin: 0 0 16px;
      color: #0b2d46;
      font-size: 24px;
      border-bottom: 2px solid #dce8f0;
      padding-bottom: 10px;
    }

    h3 {
      margin: 24px 0 10px;
      color: #163d59;
      font-size: 18px;
    }

    p {
      margin: 0 0 12px;
    }

    ul,
    ol {
      margin: 0;
      padding-left: 22px;
    }

    li {
      margin-bottom: 8px;
    }

    .systems {
      display: grid;
      grid-template-columns:
        repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-top: 18px;
    }

    .system {
      padding: 14px;
      text-align: center;
      border-radius: 10px;
      border: 1px solid #d9e1ea;
      background: #f8fafc;
      font-weight: 700;
    }

    .system.active {
      color: #075985;
      border-color: #7dd3fc;
      background: #e0f2fe;
    }

    .pricing-range {
      display: grid;
      grid-template-columns:
        repeat(2, minmax(0, 1fr));
      gap: 18px;
      margin-bottom: 20px;
    }

    .price-card {
      padding: 22px;
      border-radius: 12px;
      background: #0b2d46;
      color: #ffffff;
    }

    .price-card strong {
      display: block;
      margin-top: 6px;
      font-size: 30px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 12px;
      text-align: left;
      vertical-align: top;
      border-bottom: 1px solid #d9e1ea;
    }

    th {
      color: #475569;
      background: #f8fafc;
      font-size: 12px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .money {
      text-align: right;
      white-space: nowrap;
    }

    .equipment-table td:nth-child(2) {
      font-weight: 700;
    }

    .callout {
      padding: 18px 20px;
      border-left: 4px solid #0284c7;
      background: #f0f9ff;
    }

    .warning {
      border-left-color: #d97706;
      background: #fffbeb;
    }

    .footer {
      padding: 24px 48px;
      color: #64748b;
      background: #f8fafc;
      border-top: 1px solid #d9e1ea;
      font-size: 12px;
    }

    @media (max-width: 760px) {
      .page {
        width: 100%;
        margin: 0;
        border: 0;
      }

      .header,
      .content,
      .footer {
        padding-left: 22px;
        padding-right: 22px;
      }

      .meta {
        grid-template-columns: 1fr;
        padding-left: 22px;
        padding-right: 22px;
      }

      .systems,
      .pricing-range {
        grid-template-columns: 1fr;
      }

      h1 {
        font-size: 30px;
      }
    }

    @media print {
      body {
        background: #ffffff;
      }

      .page {
        width: 100%;
        margin: 0;
        border: 0;
        box-shadow: none;
      }

      section,
      table {
        break-inside: avoid;
      }
    }
  </style>
</head>

<body>
  <main class="page">
    <header class="header">
      <p class="brand">SmartNET AI</p>

      <h1>
        ${escapeHtml(proposal.title)}
      </h1>

      <p class="subtitle">
        ${escapeHtml(proposal.subtitle)}
      </p>
    </header>

    <div class="meta">
      ${renderMetaCard(
        "Proposal ID",
        proposal.proposalId
      )}

      ${renderMetaCard(
        "Project Type",
        formatLabel(
          proposal.projectSummary.projectType
        )
      )}

      ${renderMetaCard(
        "Generated",
        formatDate(proposal.generatedAt)
      )}
    </div>

    <div class="content">
      <section>
        <h2>Executive Summary</h2>

        <p>
          ${escapeHtml(
            proposal.scope.executiveSummary
          )}
        </p>

        <div class="systems">
          ${renderSystem(
            "Cameras",
            proposal.systems.cameras
          )}

          ${renderSystem(
            "Network",
            proposal.systems.network
          )}

          ${renderSystem(
            "Wi-Fi",
            proposal.systems.wifi
          )}

          ${renderSystem(
            "Access Control",
            proposal.systems.accessControl
          )}
        </div>
      </section>

      <section>
        <h2>Project Overview</h2>

        ${renderProjectOverview(proposal)}
      </section>

      <section>
        <h2>Preliminary Price Range</h2>

        <div class="pricing-range">
          <div class="price-card">
            <span class="label">
              Estimated Low
            </span>

            <strong>
              ${formatCurrency(
                proposal.pricingSummary
                  .estimatedLow
              )}
            </strong>
          </div>

          <div class="price-card">
            <span class="label">
              Estimated High
            </span>

            <strong>
              ${formatCurrency(
                proposal.pricingSummary
                  .estimatedHigh
              )}
            </strong>
          </div>
        </div>

        ${renderPricingTable(proposal)}
      </section>

      <section>
        <h2>Proposed Equipment</h2>

        ${renderEquipmentTable(proposal)}
      </section>

      <section>
        <h2>Scope of Work</h2>

        ${renderScopeSection(
          "General Project Scope",
          proposal.scope.scopeOfWork
        )}

        ${renderScopeSection(
          "Video Surveillance",
          proposal.scope.cameraScope
        )}

        ${renderScopeSection(
          "Network Infrastructure",
          proposal.scope.networkScope
        )}

        ${renderScopeSection(
          "Managed Wi-Fi",
          proposal.scope.wifiScope
        )}

        ${renderScopeSection(
          "Access Control",
          proposal.scope.accessControlScope
        )}

        ${renderScopeSection(
          "Cabling",
          proposal.scope.cablingScope
        )}

        ${renderScopeSection(
          "Installation",
          proposal.scope.installationScope
        )}
      </section>

      <section>
        <h2>Testing and Closeout</h2>

        ${renderList(
          proposal.scope.testingAndCloseout
        )}
      </section>

      <section>
        <h2>Assumptions</h2>

        ${renderList(
          proposal.scope.assumptions
        )}
      </section>

      <section>
        <h2>Exclusions</h2>

        ${renderList(
          proposal.scope.exclusions
        )}
      </section>

      ${
        proposal.scope.risks.length > 0
          ? `
            <section>
              <h2>Project Risks</h2>

              <div class="callout warning">
                ${renderList(
                  proposal.scope.risks
                )}
              </div>
            </section>
          `
          : ""
      }

      <section>
        <h2>Acceptance Criteria</h2>

        ${renderList(
          proposal.scope.acceptanceCriteria
        )}
      </section>

      <section>
        <h2>Next Steps</h2>

        ${renderOrderedList(
          proposal.nextSteps
        )}
      </section>

      <section>
        <div class="callout">
          <strong>
            Preliminary Proposal
          </strong>

          <p>
            ${escapeHtml(
              proposal.disclaimer
            )}
          </p>
        </div>
      </section>
    </div>

    <footer class="footer">
      SmartNET AI Proposal
      &nbsp;•&nbsp;
      Version ${escapeHtml(proposal.version)}
      &nbsp;•&nbsp;
      Session ${escapeHtml(proposal.sessionId)}
    </footer>
  </main>
</body>
</html>`;
}

function renderMetaCard(
  label: string,
  value: string
): string {
  return `
    <div class="meta-card">
      <span class="label">
        ${escapeHtml(label)}
      </span>

      <span class="value">
        ${escapeHtml(value)}
      </span>
    </div>
  `;
}

function renderSystem(
  label: string,
  active: boolean
): string {
  return `
    <div class="system ${
      active ? "active" : ""
    }">
      ${escapeHtml(label)}
      <br />
      ${active ? "Included" : "Not Included"}
    </div>
  `;
}

function renderProjectOverview(
  proposal: EstimatorProposalPackage
): string {
  const summary =
    proposal.projectSummary;

  const rows: Array<
    [string, string]
  > = [
    [
      "Customer Intent",
      summary.customerIntent ||
        "Not specified",
    ],
    [
      "Square Footage",
      summary.squareFootage === null
        ? "Not confirmed"
        : formatNumber(
            summary.squareFootage
          ),
    ],
    [
      "Number of Floors",
      summary.numberOfFloors === null
        ? "Not confirmed"
        : String(
            summary.numberOfFloors
          ),
    ],
    [
      "Construction Type",
      formatLabel(
        summary.constructionType
      ),
    ],
    [
      "Ceiling Type",
      formatLabel(
        summary.ceilingType
      ),
    ],
    [
      "Ceiling Height",
      summary.ceilingHeightFeet ===
      null
        ? "Not confirmed"
        : `${summary.ceilingHeightFeet} feet`,
    ],
  ];

  return `
    <table>
      <tbody>
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <th>
                  ${escapeHtml(label)}
                </th>

                <td>
                  ${escapeHtml(value)}
                </td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderPricingTable(
  proposal: EstimatorProposalPackage
): string {
  const pricing =
    proposal.pricingSummary;

  const rows: Array<
    [string, number]
  > = [
    [
      "Materials",
      pricing.materialCost,
    ],
    [
      "Labor",
      pricing.laborCost,
    ],
    [
      "Equipment Rental",
      pricing.equipmentRentalCost,
    ],
    [
      "Travel",
      pricing.travelCost,
    ],
    [
      "Permits",
      pricing.permitCost,
    ],
  ];

  return `
    <table>
      <thead>
        <tr>
          <th>Pricing Category</th>

          <th class="money">
            Preliminary Amount
          </th>
        </tr>
      </thead>

      <tbody>
        ${rows
          .map(
            ([label, amount]) => `
              <tr>
                <td>
                  ${escapeHtml(label)}
                </td>

                <td class="money">
                  ${formatCurrency(amount)}
                </td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderEquipmentTable(
  proposal: EstimatorProposalPackage
): string {
  const items =
    proposal.quote.lineItems;

  if (items.length === 0) {
    return `
      <p>
        Equipment selections remain pending.
      </p>
    `;
  }

  return `
    <table class="equipment-table">
      <thead>
        <tr>
          <th>Qty</th>
          <th>Description</th>
          <th>Manufacturer</th>
          <th>Model</th>
          <th>Reason</th>
        </tr>
      </thead>

      <tbody>
        ${items
          .map(
            (item) => `
              <tr>
                <td>
                  ${item.quantity}
                </td>

                <td>
                  ${escapeHtml(
                    item.description
                  )}
                </td>

                <td>
                  ${escapeHtml(
                    item.manufacturer ??
                      "TBD"
                  )}
                </td>

                <td>
                  ${escapeHtml(
                    item.model ??
                      "TBD"
                  )}
                </td>

                <td>
                  ${escapeHtml(
                    item.reason
                  )}
                </td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderScopeSection(
  title: string,
  items: string[]
): string {
  if (items.length === 0) {
    return "";
  }

  return `
    <h3>${escapeHtml(title)}</h3>
    ${renderList(items)}
  `;
}

function renderList(
  items: string[]
): string {
  if (items.length === 0) {
    return "<p>None.</p>";
  }

  return `
    <ul>
      ${items
        .map(
          (item) => `
            <li>
              ${escapeHtml(item)}
            </li>
          `
        )
        .join("")}
    </ul>
  `;
}

function renderOrderedList(
  items: string[]
): string {
  if (items.length === 0) {
    return "<p>None.</p>";
  }

  return `
    <ol>
      ${items
        .map(
          (item) => `
            <li>
              ${escapeHtml(item)}
            </li>
          `
        )
        .join("")}
    </ol>
  `;
}

function formatCurrency(
  value: number
): string {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }
  ).format(value);
}

function formatNumber(
  value: number
): string {
  return new Intl.NumberFormat(
    "en-US"
  ).format(value);
}

function formatDate(
  value: string
): string {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  ).format(date);
}

function formatLabel(
  value: string
): string {
  return value
    .replace(/_/g, " ")
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase()
    );
}

function escapeHtml(
  value: string
): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}