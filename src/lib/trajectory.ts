/** Cronologia extraída de Cler trajetoria(1).pdf: 2024, 2025, 2026 e próximos passos. */
export type Pair = { pt: string; en: string; };
export type TimelineEvent = { when: Pair; detail: Pair; date?: string; };
export type JourneyPhoto = { file: string; alt: Pair; };
export type JourneyGroup = { heading: Pair; events: TimelineEvent[]; photos: JourneyPhoto[]; };
export type JourneyYear = { year: string; groups: JourneyGroup[]; };
export const journeyLabels: Record<string, Pair> = {
  breadcrumbHome: { pt: "Início", en: "Home" },
  breadcrumbCurrent: { pt: "Nossa trajetória", en: "Our journey" },
  breadcrumbNav: { pt: "Caminho de navegação", en: "Breadcrumb navigation" },
  backToLanding: { pt: "Voltar à página inicial", en: "Back to home" },
  "eyebrow": {
    "pt": "Nossa trajetória",
    "en": "Our journey"
  },
  "years": {
    "pt": "2024 — 2026…",
    "en": "2024 — 2026…"
  },
  "ongoing": {
    "pt": "Uma história em constante evolução",
    "en": "A story that keeps evolving"
  },
  "lead": {
    "pt": "Marcos, incentivos e próximos passos de quem cuida de quem cuida.",
    "en": "Milestones, support and next steps from those who care for caregivers."
  },
  "photos": {
    "pt": "Registros dessa etapa",
    "en": "Photos from this stage"
  },
  "openPhoto": {
    "pt": "Abrir imagem em tamanho maior",
    "en": "Open image at full size"
  },
  "nextEyebrow": {
    "pt": "E agora?",
    "en": "What’s next?"
  },
  "next": {
    "pt": "Próximos passos",
    "en": "Next steps"
  },
  "deploy": {
    "pt": "Implantação",
    "en": "Implementation"
  },
  "deployBody": {
    "pt": "Piloto municipal previsto de quatro meses para cidadãos e gestores públicos.",
    "en": "A four-month municipal pilot is planned for residents and public administrators."
  },
  "product": {
    "pt": "Produto",
    "en": "Product"
  },
  "productBody": {
    "pt": "Nova versão com exames, vacinas e consultas, em parceria prevista com UFCG/VIRTUS.",
    "en": "A new version featuring exams, vaccinations and appointments, with a planned partnership with UFCG/VIRTUS."
  },
  "closing": {
    "pt": "Da segurança no uso de medicamentos a uma plataforma em validação.",
    "en": "From safer medication use to a platform undergoing validation."
  },
  "closingBody": {
    "pt": "Com duas aprovações de subvenção da FAPESQ, participações nacionais e internacionais e crescente interesse institucional, o CLER prepara uma nova versão e um piloto municipal.",
    "en": "With two FAPESQ grant approvals, national and international participation, and growing institutional interest, CLER is preparing a new version and a municipal pilot."
  },
  "tagline": {
    "pt": "Tecnologia que se importa.",
    "en": "Technology that cares."
  }
};
export const journeyYears: JourneyYear[] = [
  {
    "year": "2024",
    "groups": [
      {
        "heading": {
          "pt": "Origem e primeiro incentivo",
          "en": "Origins and first funding support"
        },
        "events": [
          {
            "when": {
              "pt": "Abril",
              "en": "April"
            },
            "detail": {
              "pt": "Constituição da empresa para desenvolver a plataforma CLER.",
              "en": "The company was established to develop the CLER platform."
            },
            "date": "2024-04"
          },
          {
            "when": {
              "pt": "Julho",
              "en": "July"
            },
            "detail": {
              "pt": "Aprovação no edital Conectando Startups — Economia da Longevidade (Governo da Paraíba/FAPESQ).",
              "en": "Selected under the Conectando Startups — Longevity Economy call (Government of Paraíba/FAPESQ)."
            },
            "date": "2024-07"
          }
        ],
        "photos": [
          {
            "file": "/assets/trajectory/p2-1.webp",
            "alt": {
              "pt": "Pessoa idosa utilizando o aplicativo CLER no celular.",
              "en": "Older adult using CLER on a phone."
            }
          },
          {
            "file": "/assets/trajectory/p2-2.webp",
            "alt": {
              "pt": "Mulher auxiliando pessoa idosa em uma rotina de cuidado.",
              "en": "Woman helping an older adult during care."
            }
          },
          {
            "file": "/assets/trajectory/p2-3.webp",
            "alt": {
              "pt": "Duas mulheres conversando durante um cuidado.",
              "en": "Two women talking during a caregiving routine."
            }
          },
          {
            "file": "/assets/trajectory/p2-4.webp",
            "alt": {
              "pt": "Mulheres consultando informações pelo celular.",
              "en": "Women looking at information on a phone."
            }
          }
        ]
      }
    ]
  },
  {
    "year": "2025",
    "groups": [
      {
        "heading": {
          "pt": "Desenvolvimento e visibilidade",
          "en": "Development and visibility"
        },
        "events": [
          {
            "when": {
              "pt": "Janeiro",
              "en": "January"
            },
            "detail": {
              "pt": "Liberação dos recursos da primeira subvenção estadual.",
              "en": "Funds from the first state grant were released."
            },
            "date": "2025-01"
          },
          {
            "when": {
              "pt": "Janeiro a novembro",
              "en": "January to November"
            },
            "detail": {
              "pt": "Desenvolvimento da plataforma CLER.",
              "en": "Development of the CLER platform."
            }
          },
          {
            "when": {
              "pt": "Setembro",
              "en": "September"
            },
            "detail": {
              "pt": "Entrevista à TV Master e palestra em projeto de inovação e economia criativa do Banco do Nordeste.",
              "en": "Interview with TV Master and a talk at a Banco do Nordeste innovation and creative economy initiative."
            },
            "date": "2025-09"
          }
        ],
        "photos": [
          {
            "file": "/assets/trajectory/p3-3.webp",
            "alt": {
              "pt": "Aplicativo CLER aberto em um celular.",
              "en": "CLER app open on a phone."
            }
          },
          {
            "file": "/assets/trajectory/p3-1.webp",
            "alt": {
              "pt": "Palestra de inovação e economia criativa.",
              "en": "Innovation and creative economy presentation."
            }
          },
          {
            "file": "/assets/trajectory/p3-2.webp",
            "alt": {
              "pt": "Representantes em encontro relacionado ao CLER.",
              "en": "Representatives at a CLER-related meeting."
            }
          }
        ]
      },
      {
        "heading": {
          "pt": "Reta final do ano",
          "en": "The final stretch of the year"
        },
        "events": [
          {
            "when": {
              "pt": "Novembro",
              "en": "November"
            },
            "detail": {
              "pt": "Web Summit Lisboa, representando o Governo da Paraíba. Aprovação no programa Qualiexporta. Palestra na UFPB sobre empreendedorismo e inovação na pesquisa e participação no podcast Deu Lucro.",
              "en": "Participated in Web Summit Lisbon representing the Government of Paraíba. Accepted into the Qualiexporta program. Gave a talk at UFPB on entrepreneurship and innovation in research and appeared on the Deu Lucro podcast."
            },
            "date": "2025-11"
          },
          {
            "when": {
              "pt": "Novembro e dezembro",
              "en": "November and December"
            },
            "detail": {
              "pt": "Trajetória de criação do CLER descrita no livro “Além do Lucro” em São Paulo e João Pessoa. Validação da plataforma no mercado B2C.",
              "en": "The story behind CLER was featured in the book “Além do Lucro” in São Paulo and João Pessoa. The platform underwent B2C market validation."
            }
          }
        ],
        "photos": [
          {
            "file": "/assets/trajectory/p4-1.webp",
            "alt": {
              "pt": "Representante do CLER no Web Summit Lisboa.",
              "en": "CLER representative at Web Summit Lisbon."
            }
          },
          {
            "file": "/assets/trajectory/p4-2.webp",
            "alt": {
              "pt": "Apresentação sobre inovação em sala de aula.",
              "en": "Innovation presentation in a classroom."
            }
          },
          {
            "file": "/assets/trajectory/p4-3.webp",
            "alt": {
              "pt": "Mulheres com exemplar do livro Além do Lucro.",
              "en": "Women holding a copy of the book Além do Lucro."
            }
          }
        ]
      }
    ]
  },
  {
    "year": "2026",
    "groups": [
      {
        "heading": {
          "pt": "Ampliação e novas oportunidades",
          "en": "Growth and new opportunities"
        },
        "events": [
          {
            "when": {
              "pt": "Março",
              "en": "March"
            },
            "detail": {
              "pt": "Seleção e apresentação no Spotlight Web Summit; validação indireta no mercado B2B.",
              "en": "Selected to present at Spotlight Web Summit; indirect validation in the B2B market."
            },
            "date": "2026-03"
          },
          {
            "when": {
              "pt": "Abril e maio",
              "en": "April and May"
            },
            "detail": {
              "pt": "Aprovação no edital Conectando Startups — Saúde Digital (Governo da Paraíba/FAPESQ).",
              "en": "Selected under the Conectando Startups — Digital Health call (Government of Paraíba/FAPESQ)."
            }
          },
          {
            "when": {
              "pt": "Junho",
              "en": "June"
            },
            "detail": {
              "pt": "Seleção e participação no Web Summit Rio, representando o Governo da Paraíba.",
              "en": "Selected to attend Web Summit Rio representing the Government of Paraíba."
            },
            "date": "2026-06"
          }
        ],
        "photos": [
          {
            "file": "/assets/trajectory/p5-1.webp",
            "alt": {
              "pt": "Apresentação do CLER em evento de inovação.",
              "en": "CLER presentation at an innovation event."
            }
          },
          {
            "file": "/assets/trajectory/p5-2.webp",
            "alt": {
              "pt": "Representante apresenta o CLER no palco.",
              "en": "Representative presenting CLER on stage."
            }
          },
          {
            "file": "/assets/trajectory/p5-3.webp",
            "alt": {
              "pt": "Equipe CLER em estande de evento.",
              "en": "CLER team at an event booth."
            }
          },
          {
            "file": "/assets/trajectory/p5-4.webp",
            "alt": {
              "pt": "Participante em frente à marca do Web Summit.",
              "en": "Attendee in front of the Web Summit branding."
            }
          }
        ]
      },
      {
        "heading": {
          "pt": "Cada vez mais perto de quem cuida",
          "en": "Getting closer to those who care"
        },
        "events": [
          {
            "when": {
              "pt": "Julho",
              "en": "July"
            },
            "detail": {
              "pt": "Apresentação do CLER à comitiva portuguesa, em encontro da SECTIES no PTHI, em João Pessoa. Participação na FETECH e aprovação no programa de pré-aceleração HUB PB.",
              "en": "Presented CLER to a Portuguese delegation at a SECTIES meeting at PTHI in João Pessoa. Participated in FETECH and was selected for the HUB PB pre-acceleration program."
            },
            "date": "2026-07"
          },
          {
            "when": {
              "pt": "Ao longo de 2026",
              "en": "Throughout 2026"
            },
            "detail": {
              "pt": "Interesse de prefeitos de três estados na implantação do CLER; Paraíba definida como prioridade. Nova aprovação no Edital nº 0009/2026 para expor no Web Summit Lisboa, previsto de 9 a 12/11, pelo segundo ano consecutivo.",
              "en": "Mayors from three states expressed interest in implementing CLER; Paraíba was set as the priority. Selected again under Call No. 0009/2026 to exhibit at Web Summit Lisbon, scheduled for November 9–12, for the second consecutive year."
            }
          }
        ],
        "photos": [
          {
            "file": "/assets/trajectory/p6-3.webp",
            "alt": {
              "pt": "Apresentação do CLER em auditório.",
              "en": "CLER presentation in an auditorium."
            }
          },
          {
            "file": "/assets/trajectory/p6-1.webp",
            "alt": {
              "pt": "Participantes reunidos em evento institucional.",
              "en": "Attendees gathered at an institutional event."
            }
          },
          {
            "file": "/assets/trajectory/p6-2.webp",
            "alt": {
              "pt": "Representante CLER conversando com participantes.",
              "en": "CLER representative speaking with attendees."
            }
          }
        ]
      }
    ]
  }
];
