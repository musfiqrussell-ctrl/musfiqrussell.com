import React, { useEffect } from 'react';
import { useData } from '../../context/DataContext';

export const StructuredData: React.FC = () => {
  const {
    profile,
    siteSettings,
    businesses,
    experiences,
    offices,
    socialLinks,
    services,
  } = useData();

  useEffect(() => {
    // Find business item for Qutube Rabbani IT Solution
    const itSolution = businesses.find(
      (b) =>
        b.id === 'it-solution' ||
        b.companyEn.toLowerCase().includes('it solution')
    ) || businesses[0];

    const boostingAgency = businesses.find(
      (b) =>
        b.id === 'boosting-agency' ||
        b.companyEn.toLowerCase().includes('boosting')
    );

    // Filter offices for IT Solution
    const headOffice = offices.find((o) => o.type === 'head') || offices[0];
    const branchOffice = offices.find((o) => o.type === 'branch') || offices[1];

    // Build experience itemList
    const experienceListElements = experiences.map((exp, index) => {
      const isItSolution =
        exp.organization.toLowerCase().includes('qutube') ||
        exp.organization.toLowerCase().includes('it solution');
      const isBoosting = exp.organization.toLowerCase().includes('boosting');

      let worksForEntity: Record<string, unknown> = {
        '@type': 'Organization',
        name: exp.organization,
      };

      if (isItSolution) {
        worksForEntity = {
          '@id': 'https://musfiqrussell.com/#qutuberabbaniitsolution',
        };
      } else if (isBoosting) {
        worksForEntity = {
          '@id': 'https://musfiqrussell.com/#qutuberabbaniboostingagency',
        };
      }

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Role',
          roleName: exp.position,
          startDate: exp.joiningDate || undefined,
          endDate: exp.endDate || undefined,
          description: exp.responsibilities || undefined,
          worksFor: worksForEntity,
        },
      };
    });

    const socialUrls = socialLinks.map((s) => s.url).filter((url) => Boolean(url));

    const schemaGraph: Record<string, unknown>[] = [
      // Person Entity
      {
        '@type': 'Person',
        '@id': 'https://musfiqrussell.com/#person',
        name: profile.fullName,
        alternateName: [profile.displayNameBn, profile.displayNameEn],
        jobTitle: profile.professionalTitleEn,
        description: `${profile.bioBn} | ${profile.bioEn}`,
        url: `https://${siteSettings.domain || 'musfiqrussell.com'}`,
        image: profile.avatarUrl,
        telephone: [profile.primaryMobile, profile.alternativeMobile, profile.businessMobile].filter(Boolean),
        email: profile.primaryEmail,
        sameAs: socialUrls,
        founder: [
          { '@id': 'https://musfiqrussell.com/#qutuberabbaniitsolution' },
          { '@id': 'https://musfiqrussell.com/#qutuberabbaniboostingagency' },
        ],
        worksFor: experiences.map((exp) => ({
          '@type': 'OrganizationRole',
          roleName: exp.position,
          startDate: exp.joiningDate || undefined,
          endDate: exp.endDate || undefined,
          worksFor: {
            '@type': 'Organization',
            name: exp.organization,
          },
        })),
        hasOccupation: [
          {
            '@type': 'Occupation',
            name: 'Graphics Designer',
            description:
              'Visual branding, logo design, promotional graphics, advertisements, and corporate identity.',
          },
          {
            '@type': 'Occupation',
            name: 'Digital Advertising Expert',
            description:
              'Data-driven Meta Ads and Google Ads management, conversion optimization, and brand scaling.',
          },
          {
            '@type': 'Occupation',
            name: 'Official Document Consultant',
            description:
              'Official government documentation, passport applications, NID correction, and visa processing support.',
          },
        ],
        alumniOf: [
          {
            '@type': 'EducationalOrganization',
            name: 'Govt. Bangla College',
            alternateName: 'সরকারি বাঙলা কলেজ',
            description: "Master's Degree in Social Work (সমাজকর্ম)",
          },
          {
            '@type': 'EducationalOrganization',
            name: 'Govt. Tolaram College',
            alternateName: 'সরকারি তোলারাম কলেজ',
            description: "Bachelor's (Honours) in Social Work (সমাজকর্ম)",
          },
        ],
        award: [
          "Freelancer Award 2024 - Govt. of the People's Republic of Bangladesh | BESIS",
          "Best Document Consultant 2022 - Govt. of the People's Republic of Bangladesh | BESIS",
        ],
        knowsAbout: [
          'Graphic Design',
          'Digital Advertising',
          'Meta Ads Manager',
          'Google Ads',
          'Document Consultancy',
          'Passport Assistance',
          'NID Correction',
          'Travel Agency Operations',
        ],
      },
    ];

    // Qutube Rabbani IT Solution Structured Data
    if (itSolution) {
      const itDepartments: Record<string, unknown>[] = [];

      if (headOffice) {
        itDepartments.push({
          '@type': 'LocalBusiness',
          name: `${itSolution.companyEn} - Head Office`,
          alternateName: `${itSolution.companyBn} - প্রধান কার্যালয়`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Adjacent to Regional Passport Office, Sonali Market, Raghunathpur',
            addressLocality: 'Narayanganj Sadar',
            addressRegion: 'Narayanganj',
            postalCode: '1421',
            addressCountry: 'BD',
          },
          telephone: headOffice.phone || itSolution.phone,
          openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 09:00-17:00',
        });
      }

      if (branchOffice) {
        itDepartments.push({
          '@type': 'LocalBusiness',
          name: `${itSolution.companyEn} - Branch Office`,
          alternateName: `${itSolution.companyBn} - শাখা কার্যালয়`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Munshi Bari Gate, Kutubshah Bazar, Char Titia Deula Union, Ward No - 8',
            addressLocality: 'Borhanuddin',
            addressRegion: 'Bhola',
            postalCode: '8320',
            addressCountry: 'BD',
          },
          hasMap: branchOffice.googleMapsUrl || 'https://share.google/UWUz9tNyQBipduwk6',
          telephone: branchOffice.phone || itSolution.phone,
          openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 09:00-22:00',
        });
      }

      schemaGraph.push({
        '@type': ['LocalBusiness', 'ProfessionalService', 'Organization'],
        '@id': 'https://musfiqrussell.com/#qutuberabbaniitsolution',
        name: itSolution.companyEn,
        alternateName: itSolution.companyBn,
        legalName: itSolution.companyEn,
        founder: { '@id': 'https://musfiqrussell.com/#person' },
        foundingDate: itSolution.founded || '2019',
        url: itSolution.website || 'https://qutuberabbaniitsolution.netlify.app',
        logo: itSolution.logoUrl,
        image: itSolution.logoUrl,
        telephone: itSolution.phone,
        email: itSolution.email,
        priceRange: '$$',
        description: itSolution.descriptionBn || itSolution.descriptionEn,
        sameAs: [
          itSolution.facebook,
          itSolution.website,
        ].filter(Boolean),
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Narayanganj' },
          { '@type': 'AdministrativeArea', name: 'Bhola' },
          { '@type': 'Country', name: 'Bangladesh' },
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Adjacent to Regional Passport Office, Sonali Market, Raghunathpur',
          addressLocality: 'Narayanganj Sadar',
          addressRegion: 'Narayanganj',
          postalCode: '1421',
          addressCountry: 'BD',
        },
        department: itDepartments,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${itSolution.companyEn} Portfolio Services`,
          itemListElement: itSolution.services.map((srv) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: srv,
            },
          })),
        },
      });
    }

    // Boosting Agency Structured Data
    if (boostingAgency) {
      schemaGraph.push({
        '@type': ['ProfessionalService', 'Organization'],
        '@id': 'https://musfiqrussell.com/#qutuberabbaniboostingagency',
        name: boostingAgency.companyEn,
        alternateName: boostingAgency.companyBn,
        founder: { '@id': 'https://musfiqrussell.com/#person' },
        foundingDate: boostingAgency.founded || '2022',
        telephone: boostingAgency.phone,
        email: boostingAgency.email,
        logo: boostingAgency.logoUrl,
        description: boostingAgency.descriptionBn || boostingAgency.descriptionEn,
        sameAs: [boostingAgency.facebook].filter(Boolean),
        areaServed: 'Bangladesh',
      });
    }

    // Professional Experience Career History Entity
    schemaGraph.push({
      '@type': 'ItemList',
      '@id': 'https://musfiqrussell.com/#experience',
      name: `Professional Experience & Career History of ${profile.fullName}`,
      itemListElement: experienceListElements,
    });

    // Services Catalog & Specific Service Schema Entities for Local SEO (Narayanganj & Bhola)
    const localTargetAreas = [
      { '@type': 'City', name: 'Narayanganj', '@id': 'https://en.wikipedia.org/wiki/Narayanganj' },
      { '@type': 'City', name: 'Bhola', '@id': 'https://en.wikipedia.org/wiki/Bhola' },
      { '@type': 'AdministrativeArea', name: 'Narayanganj District' },
      { '@type': 'AdministrativeArea', name: 'Bhola District' },
      { '@type': 'Country', name: 'Bangladesh' },
    ];

    schemaGraph.push({
      '@type': 'ProfessionalService',
      '@id': 'https://musfiqrussell.com/#service',
      name: `${profile.displayNameEn} Creative & Digital Services`,
      alternateName: `${profile.displayNameBn} এর ডিজিটাল ও ক্রিয়েটিভ সেবাসমূহ`,
      provider: { '@id': 'https://musfiqrussell.com/#person' },
      areaServed: localTargetAreas,
      serviceType: services.map((s) => s.titleEn),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Design, Marketing & Official Document Solutions',
        itemListElement: services.map((srv, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Service',
            '@id': `https://musfiqrussell.com/#service-${srv.id || index + 1}`,
            name: `${srv.titleEn} (${srv.titleBn})`,
            description: `${srv.descriptionEn || ''} ${srv.descriptionBn || ''}`.trim(),
            serviceType: srv.titleEn,
            provider: { '@id': 'https://musfiqrussell.com/#person' },
            areaServed: localTargetAreas,
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: `${srv.titleEn} Offerings`,
              itemListElement: (srv.itemsEn || srv.itemsBn || []).map((feat, fIdx) => ({
                '@type': 'Offer',
                position: fIdx + 1,
                itemOffered: {
                  '@type': 'Service',
                  name: feat,
                },
              })),
            },
          },
        })),
      },
    });

    // Add individual discrete Service entities for granular search engine indexing
    services.forEach((srv, index) => {
      schemaGraph.push({
        '@type': 'Service',
        '@id': `https://musfiqrussell.com/#service-${srv.id || index + 1}`,
        name: `${srv.titleEn} - Narayanganj & Bhola`,
        alternateName: `${srv.titleBn} - নারায়ণগঞ্জ ও ভোলা`,
        description: srv.descriptionEn || srv.descriptionBn,
        serviceType: srv.titleEn,
        provider: { '@id': 'https://musfiqrussell.com/#person' },
        areaServed: localTargetAreas,
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: `https://${siteSettings.domain || 'musfiqrussell.com'}#services`,
          servicePhone: profile.primaryMobile,
        },
      });
    });

    // Website Entity
    schemaGraph.push({
      '@type': 'WebSite',
      '@id': 'https://musfiqrussell.com/#website',
      name: siteSettings.websiteName || 'Musfiq Russell - Official Portfolio & Business Services',
      url: `https://${siteSettings.domain || 'musfiqrussell.com'}`,
      publisher: { '@id': 'https://musfiqrussell.com/#person' },
      inLanguage: ['bn', 'en'],
    });

    const fullSchema = {
      '@context': 'https://schema.org',
      '@graph': schemaGraph,
    };

    // Update or create the script tag in document.head
    let scriptTag = document.getElementById('static-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'static-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(fullSchema, null, 2);
  }, [profile, siteSettings, businesses, experiences, offices, socialLinks, services]);

  return null;
};
